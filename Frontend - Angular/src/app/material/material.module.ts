import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

//----------------------------------------------------
import { MatCardModule} from '@angular/material/card'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';


//-----------------------------
import { FormControl } from '@angular/forms';


@NgModule({
  imports: [
    BrowserModule,
    LayoutModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatListModule,
    CommonModule,
    MatToolbarModule,
    MatGridListModule,
    MatNativeDateModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule, 
    MatCheckboxModule, 
    MatDatepickerModule, 
    MatFormFieldModule,
    MatInputModule, 
    MatRadioModule, 
    MatSelectModule, 
    MatSliderModule, 
    MatSlideToggleModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatBadgeModule
  ],
  exports: [
    BrowserModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
    MatToolbarModule,
    MatGridListModule,
    MatNativeDateModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule, 
    MatCheckboxModule, 
    MatDatepickerModule, 
    MatFormFieldModule,
    MatInputModule, 
    MatRadioModule, 
    MatSelectModule, 
    MatSliderModule, 
    MatSlideToggleModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatBadgeModule
  ],
  declarations: [],
})
export class MaterialModule { }