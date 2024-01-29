import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EndpointsRoutingModule } from './endpoints-routing.module';
import { EndpointsListComponent } from './endpoints-list/endpoints-list.component';
import { EndpointsNewComponent } from './endpoints-new/endpoints-new.component';
import { EndpointsEditComponent } from './endpoints-edit/endpoints-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CodeEditorModule } from '@ngstack/code-editor';

@NgModule({
  declarations: [
    EndpointsListComponent,
    EndpointsNewComponent,
    EndpointsEditComponent
  ],
  imports: [
    EndpointsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CodeEditorModule,
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,
    MatIconModule, MatButtonModule,
  ],
})
export class EndpointsModule { }
