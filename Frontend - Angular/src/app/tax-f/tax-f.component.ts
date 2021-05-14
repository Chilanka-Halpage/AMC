import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { TaxService } from '../tax.service';
import { Router,NavigationExtras } from '@angular/router';
import { Tax } from './../tax';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { delay } from 'rxjs/internal/operators/delay';
import { map } from 'rxjs/internal/operators/map';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-tax-f',
  templateUrl: './tax-f.component.html',
  styleUrls: ['./tax-f.component.scss']
})
export class TaxFComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private taxService: TaxService,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  taxId: number;
  private taxForm$: Observable<any>;
  public isDesabled = false;
  public type: any;
  public TaxSavingProgress = false;

  addtaxForm = this.fb.group({
    taxName: ['', [Validators.required], [this.existTaxValidator()], blur],
    shortName: ['', [Validators.required]],
    taxRate: ['', [Validators.required, Validators.max(999)]],
    taxId: [''],
    savedOn: [''],
    savedIp: [''],
    active: ['']
  })

  ngOnInit(): void {
    this.checkStatus()
  }

  saveTax() {
    if(this.addtaxForm.valid){
    this.taxService.createTax(this.addtaxForm.value).subscribe(data => {
      this.TaxSavingProgress = true; 
       this.notificationService.showNoitfication('Successfully done', 'OK', 'success', () => { this.router.navigate(['/taxlist']) });
       
    },
      error =>  { let message = (error.status === 501) ? error.error.message : 'Cannot proceed the request. Try again'
                  this.notificationService.showNoitfication(message, 'OK', 'error', null); }
      );
    }else{
      this.TaxSavingProgress = false; 
    }
  }
  goToTaxList() {
    this.router.navigate(['/taxlist']);
  }
  onSubmit() {
    this.saveTax();
  }
  private checkStatus(): void {
    this.taxForm$ = this.addtaxForm.statusChanges;
    this.taxForm$.subscribe(response => {
      if (response === 'PENDING') {
        setTimeout(() => {
          this.addtaxForm.updateValueAndValidity();
        }, 2000);
      }
    })
  }

  private existTaxValidator():AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!this.type) {
        return of(control.value).pipe(
          delay(500),
          switchMap((taxName: string) => this.taxService.doesTaxExists(taxName)),
          map(response => {
            this.isDesabled = response;
            return response ? { taxNameExists: true } : null
          })
        )
      }
      return of(null);
    };
  }
}


