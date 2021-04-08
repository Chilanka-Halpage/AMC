import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-all-clients-details-filter',
  templateUrl: './all-clients-details-filter.component.html',
  styleUrls: ['./all-clients-details-filter.component.scss']
})
export class AllClientsDetailsFilterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  allAmcFilter = this.fb.group({
    Date1: [''],
    Date2: ['']
  });
  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.allAmcFilter.value);
    this.router.navigate(['generatereport', {relativeTo: this.route}])
  }

}
