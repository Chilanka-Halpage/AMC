import { delay, first, map, switchMap, timeout, take, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Component, ElementRef, OnInit, Pipe } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { ClientService } from 'src/app/shared/client.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { of, Observable } from 'rxjs';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  private clientId: number;
  private cname: String;
  private data: any; // holds data for editing data whent editing request comes
  private clientForm$: Observable<any>;
  public clientForm: FormGroup;
  public type: any; // this variable defines request type to this component. this component is used to create new client and department and to edit client and department data as well 
  public clientSavingProgress = false;
  public isDesabled = false;
  public heading = 'Create Client';
  public description = 'New client and department details';


  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private elementRef: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    //calling for creating a reactive form
    this.createForm();
    //Obtain data via url for updating of client and department details and for creating new departmetn for existing client
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['data']) {
        let value = JSON.parse(params['data']);
        this.data = value.data;
        this.type = value.type;
        this.clientId = value.cid;
        this.cname = value.cname;
        //set values to form fields for editing acootding to requset. Request can be either editing client or department data or creating new department 
        this.setForm(this.type);
      }
    });
  }

  //crating reactive form
  private createForm() {
    this.clientForm = this.formBuilder.group({
      client: this.formBuilder.group({
        clientId: [''],
        clientName: ['', [Validators.required, Validators.pattern(/^.{3,}$/)], [this.clientExistsValidator()]],
        contactNo: ['', [Validators.required, Validators.pattern(/^((0[1-9][0-9]{8})|(\+[0-9]{1,3}[1-9][0-9]{8,}))$/)]],
        contactPerson: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s.]+$/)]],
        address: ['', [Validators.required]],
        active: [true]
      }),
      deptId: [''],
      departmentName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s.]+$/)], [this.deptExistsValidator()]],
      email: ['', [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      contactNo: ['', [Validators.required, Validators.pattern(/^((0[1-9][0-9]{8})|(\+[0-9]{1,3}[1-9][0-9]{8,}))$/)]],
      contactPerson: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s.]+$/)]],
      active: [true]
    });
  }
  //check wheter the client going to be saved is existing or not by calling to backend
  private clientExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!this.type) {
        return of(control.value).pipe(
          delay(500),
          switchMap((clientName: string) => this.clientService.doesClientExists(clientName)),
          map(response => {
            this.isDesabled = response;
            return response ? { clientExists: true } : null
          })
        )
      }
      return of(null);
    };
  }

  //check wheter the department going to be saved is existing or not releveant to the client by calling to backend
  private deptExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (this.type === '%DC4%') {
        return of(control.value).pipe(
          delay(500),
          switchMap((deptName: string) => this.clientService.doesDeptExists(deptName, this.clientId).pipe(
            map(response => {
              this.isDesabled = response;
              return response ? { deptExists: true } : null
            })
          ))
        )
      }
      return of(null);
    }
  }

  //According to request type, data is set to the form fields
  private setForm(type: any): void {
    if (type === '%CE2%') { // request type -> client edit
      this.heading = 'Edit Client';
      this.description = 'Client details modification';
      this.loadClientData();
    }
    else if (type === '%DE3%') { // request type -> department edit
      this.heading = 'Edit Department';
      this.description = 'Department details modification';
      this.loadDeptData();
    }
    else if (type === '%DC4%') { // request type -> new department creation for existing client
      this.heading = 'Create Department';
      this.description = 'New Department details';
      this.activatedRoute.paramMap.subscribe(params => {
        this.clientId = +params.get('cid');
        this.loadClientDataForNewDept(this.clientId);
      });
      this.checkStatus();
    } else {
      this.checkStatus();
    }
  }

  // when client edit requset comes, set client data to form fields
  loadClientData(): void {
    this.clientForm.patchValue({
      client: {
        clientId: this.data.clientId,
        clientName: this.data.clientName,
        contactNo: this.data.contactNo,
        contactPerson: this.data.contactPerson,
        address: this.data.address,
        active: this.data.active
      }
    });
  }

  // when department edit requset comes, set department data to form fields
  loadDeptData(): void {
    this.clientForm.get('client').disable();
    this.clientForm.patchValue({
      deptId: this.data.deptId,
      departmentName: this.data.departmentName,
      email: this.data.email,
      contactNo: this.data.contactNo,
      contactPerson: this.data.contactPerson,
      active: this.data.active
    });
  }

  // when department creation requset for existing client comes, set existing client data to form fields
  loadClientDataForNewDept(cid: number): void {
    this.clientForm.get('client').disable();
    this.clientService.getClientByClientId(cid).subscribe(response => {
      this.clientForm.patchValue({
        client: {
          clietnID: response.clientId,
          clientName: response.clientName,
          contactNo: response.contactNo,
          contactPerson: response.contactPerson,
          address: response.address,
          active: response.active
        }
      });
    }, (error) => {
      const errMessage = (error.status === 0 || error.status === 404 || error.status === 403 || error.status === 401) ? error.error : 'Error in loading data';
      this.notificationService.showNoitfication(errMessage, 'OK', 'error', null);
    });
  }

  //send new client and depatment data by calling to the backend
  createClient(): void {
    if (this.clientForm.valid) {
      this.clientSavingProgress = true;
      this.clientService.saveClientAndDepartment(this.clientForm.value).subscribe(
        response => {
          let navigationExtras: NavigationExtras = {
            queryParams: {
              data: JSON.stringify({
                cid: response.clientId,
                cname: response.clientName,
                did: response.deptId,
                dname: response.deptName,
                type: "%c1%"
              })
            }
          };
          this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { this.router.navigate(['/amcMaster/new'], navigationExtras) });
        },
        (error) => {
          let message = (error.status === 0 || error.status === 404 || error.status === 501 || error.status === 403 || error.status === 401) ? error.error : 'Cannot proceed the request. Try again'
          this.notificationService.showNoitfication(message, 'OK', 'error', null);
        }
      ).add(() => this.clientSavingProgress = false);
    } else {
      this.scrollToFirstInvalidControl();
    }
  }

  //send new depatment data for existing client by calling to the backend
  createDept() {
    if (this.clientForm.valid) {
      this.clientSavingProgress = true;
      this.clientService.saveDepartmentByClientId(this.clientId, this.clientForm.value).subscribe(
        response => {
          let navigationExtras: NavigationExtras = {
            queryParams: {
              "data": JSON.stringify({
                "id": this.clientId,
                "name": this.cname
              })
            }
          };
          this.notificationService.showNoitfication(response, 'OK', 'success', () => { this.router.navigate([`dept-list/${this.clientId}`],navigationExtras) });
        },
        (error) => {
          let message = (error.status === 0 || error.status === 404 || error.status === 501 || error.status === 403 || error.status === 401) ? error.error : 'Cannot proceed the request. Try again'
          this.notificationService.showNoitfication(message, 'OK', 'error', null);
        }
      ).add(() => this.clientSavingProgress = false);
    } else {
      this.scrollToFirstInvalidControl();
    }
  }

  //send edited client data to the backend for saving changes
  updateClient() {
    if (this.clientForm.get('client').valid) {
      this.clientSavingProgress = true;
      this.clientService.updateClient(this.clientForm.value.client).subscribe(
        response => {
          this.notificationService.showNoitfication(response, 'OK', 'success', () => { this.navigateToClientList() });
        },
        (error) => {
          let message = (error.status === 0 || error.status === 404 || error.status === 501 || error.status === 403 || error.status === 401) ? error.error : 'Cannot proceed the request. Try again'
          this.notificationService.showNoitfication(message, 'OK', 'error', null);
        }
      ).add(() => this.clientSavingProgress = false);
    } else {
      this.scrollToFirstInvalidControl();
    }
  }

  //send edited department data to the backend for saving changes
  updateDept() {
    if (this.clientForm.valid) {
      this.clientSavingProgress = true;
      this.clientService.updateDepartment(this.clientForm.value, this.clientId, this.clientForm.value.deptId).subscribe(
        response => {
          let navigationExtras: NavigationExtras = {
            queryParams: {
              "data": JSON.stringify({
                "id": this.clientId,
                "name": this.cname
              })
            }
          };
          this.notificationService.showNoitfication(response, 'OK', 'success', () => { this.router.navigate([`dept-list/${this.clientId}`],navigationExtras) });
        },
        (error) => {
          let message = (error.status === 0 || error.status === 404 || error.status === 501 || error.status === 403 || error.status === 401) ? error.error : 'Cannot proceed the request. Try again'
          this.notificationService.showNoitfication(message, 'OK', 'error', null);
        }
      ).add(() => this.clientSavingProgress = false);
    } else {
      this.scrollToFirstInvalidControl();
    }
  }

  //change form controllers status to new status, when asyn validator is used.
  private checkStatus(): void {
    this.clientForm$ = this.clientForm.statusChanges;
    this.clientForm$.subscribe(response => {
      if (response === 'PENDING') {
        setTimeout(() => {
          this.clientForm.updateValueAndValidity();
        }, 2000);
      }
    })
  }

  //reset form when it clickes on reset button in the form
  resetForm(): void {
    this.clientForm.reset();
    this.isDesabled = false;
    this.elementRef.nativeElement.querySelector('#client-name').scrollIntoView();
  }

  //scrroll the form to first invalid form ,when it clicks on save button, if any invalid form is there
  scrollToFirstInvalidControl(): void {
    const firstInvalidControl: HTMLElement = this.elementRef.nativeElement.querySelector('form .ng-invalid');
    firstInvalidControl.scrollIntoView({ behavior: 'smooth' });
  }

  //whent it clicks on existing client button, call to this method to navigate
  navigateToClientList(): void {
    this.router.navigateByUrl('client-list');
  }

  //below code lines for getting form controllers for validating

  get clientName(): AbstractControl {
    return this.clientForm.get('client.clientName');
  }
  get clientContactNo(): AbstractControl {
    return this.clientForm.get('client.contactNo');
  }
  get clientContactPerson(): AbstractControl {
    return this.clientForm.get('client.contactPerson');
  }
  get clientAddress(): AbstractControl {
    return this.clientForm.get('client.address');
  }
  get departmentName(): AbstractControl {
    return this.clientForm.get('departmentName');
  }
  get departmentEmail(): AbstractControl {
    return this.clientForm.get('email');
  }
  get departmentContactNo(): AbstractControl {
    return this.clientForm.get('contactNo');
  }
  get departmentContactPerson(): AbstractControl {
    return this.clientForm.get('contactPerson');
  }

}
