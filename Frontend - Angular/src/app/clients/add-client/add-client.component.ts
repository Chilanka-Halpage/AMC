import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ClientService } from 'src/app/shared/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedAmcService } from 'src/app/shared/shared-amc.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  clientForm: FormGroup;
  registerStudentProgress = false;
  cid: number;
  clientExistance = false;
  formVisibility = {
    heading: 'New Client',
    description: 'Create new client and department details',
    topBtnVisible: true,
    departmentDetailsVisible: true,
    clientDetailsVisible: true,
    btnLabel: 'Create'
  };

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private sharedService: SharedAmcService,
    private elementRef: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      client: this.formBuilder.group({
        clietnID: [''],
        clientName: ['', [Validators.required]],
        contactNo: ['', [Validators.required, Validators.pattern(/^(0[1-9][0-9]{8})|(\+94[1-9][0-9]{8})$/)]],
        contactPerson: ['', [Validators.required]],
        address: ['', [Validators.required]],
        active: false
      }),
      departmentName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      contactNo: ['', [Validators.required, Validators.pattern(/^(0[1-9][0-9]{8})|(\+94[1-9][0-9]{8})$/)]],
      contactPerson: ['', [Validators.required]],
      isActive: false
    });
    this.setForm();
  }
  checkClient(): void {
    if (this.clientForm.get('client').get('clientName').status == 'VALID') {
      this.clientService.isAClient(this.clientForm.value.client.clientName).subscribe(value => {
        console.log(value);
        this.clientExistance = value;
      })
    }
  }

  setForm(): void {
    this.activatedRoute.url.subscribe(url => {
      if (url[1].path.includes('edit')) {
        this.updateClientData();
      }
      else if (url[1].path.includes('dept') && url[2].path.includes('edit')) {
        this.updateDepartmentData();
      }
      else if (url[2].path.includes('dept') && url[3].path.includes('new')) {
        this.formVisibility.btnLabel = 'Submit';
        this.formVisibility.heading = 'New Department';
        this.formVisibility.description = 'Create new Department for a client';
        this.activatedRoute.paramMap.subscribe(params => {
          this.cid = +params.get('cid');
          this.createNewDept(this.cid);
        });
      }
      else { }
    });
  }

  updateClientData(): void {
    this.sharedService.dataChange.subscribe(value => {
      console.log(value);
      this.changeFormVisibility('Update Client', 'Edit client details', false, false, true, 'Update');
      this.clientForm.patchValue({
        client: {
          clietnID: value.clietnID,
          clientName: value.clientName,
          contactNo: value.contactNo,
          contactPerson: value.contactPerson,
          address: value.address,
          active: (value.active == 'Active') ? true : false
        }
      });
    });
  }

  updateDepartmentData(): void {
    this.sharedService.dataChange.subscribe(value => {
      this.changeFormVisibility('Update Department', 'Edit department details', false, true, false, 'Update');
      this.clientForm.patchValue({
        deptId: value.deptId,
        departmentName: value.departmentName,
        email: value.email,
        contactNo: value.contactNo,
        contactPerson: value.contactPerson,
        isActive: (value.isActive == 'Active') ? true : false
      });
    });
  }

  createNewDept(cid: number): void {
    this.clientForm.get('client').disable();
    this.clientService.getClientByClientId(cid).subscribe(response => {
      console.log(response);
      this.clientForm.patchValue({
        client: {
          clietnID: response.clietnID,
          clientName: response.clientName,
          contactNo: response.contactNo,
          contactPerson: response.contactPerson,
          address: response.address,
          active: (response.active == 'Active') ? true : false
        }
      });
    }, error => {
      console.log(error);
    });
  }

  changeFormVisibility(heading, description, topBtnVisible, departmentDetailsVisible, clientDetailsVisible, btnLabel): void {
    this.formVisibility.heading = heading,
      this.formVisibility.description = description,
      this.formVisibility.topBtnVisible = topBtnVisible,
      this.formVisibility.departmentDetailsVisible = departmentDetailsVisible,
      this.formVisibility.clientDetailsVisible = clientDetailsVisible,
      this.formVisibility.btnLabel = btnLabel;
  }

  submitForm(): void {
    this.registerStudentProgress = true;
    if (this.formVisibility.clientDetailsVisible && this.formVisibility.departmentDetailsVisible) {
      if (this.clientForm.valid) {
        if (this.formVisibility.btnLabel === 'Create') {
          this.clientService.saveClientAndDepartment(this.clientForm.value).subscribe(
            response => {
              console.log(response);
              this.clientService.success(response);
            },
            error => {
              this.clientService.warn(error);
            }
          ).add(() => this.registerStudentProgress = false);
        } else if (this.formVisibility.btnLabel === 'Submit') {
          this.clientService.saveDepartmentByClientId(this.cid, this.clientForm.value).subscribe(
            response => {
              console.log(response);
              this.clientService.success(response);
            },
            error => {
              this.clientService.warn(error);
            }
          ).add(() => this.registerStudentProgress = false);
        }
      }
      else {
        this.registerStudentProgress = false;
        this.scrollToFirstInvalidControl();
      }
    }
    else if (this.formVisibility.clientDetailsVisible) {
      if (this.clientForm.controls.client.status === 'VALID') {
        this.clientService.updateClient(this.clientForm.value.client).subscribe(
          response => {
            console.log(response);
            this.clientService.success(response);
          },
          error => {
            this.clientService.warn(error);
          }
        ).add(() => this.registerStudentProgress = false);
      }
      else {
        this.registerStudentProgress = false;
        this.scrollToFirstInvalidControl();
      }
    }
  }

  resetForm(): void {
    this.clientForm.reset();
    this.clientExistance = false;
    this.elementRef.nativeElement.querySelector('#client-name').scrollIntoView();
  }

  scrollToFirstInvalidControl(): void {
    const firstInvalidControl: HTMLElement = this.elementRef.nativeElement.querySelector('form .ng-invalid');
    firstInvalidControl.scrollIntoView({ behavior: 'smooth' });
  }

  navigateToClientList(): void {
    this.router.navigateByUrl('client-list');
  }

  get clientName(): AbstractControl {
    return this.clientForm.get('client').get('clientName');
  }

  get clientContactNo(): AbstractControl {
    return this.clientForm.get('client').get('contactNo');
  }
  get clientContactPerson(): AbstractControl {
    return this.clientForm.get('client').get('contactPerson');
  }
  get clientAddress(): AbstractControl {
    return this.clientForm.get('client').get('address');
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
