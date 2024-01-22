import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatasetsRoutingModule } from './datasets-routing.module';
import { DatasetsListComponent } from './datasets-list/datasets-list.component';
import { DatasetsNewComponent } from './datasets-new/datasets-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatasetsEditComponent } from './datasets-edit/datasets-edit.component';

import { MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DatasetsListComponent,
    DatasetsNewComponent,
    DatasetsEditComponent
  ],
  imports: [
    DatasetsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,
    MatIconModule, MatButtonModule,
  ]
})
export class DatasetsModule { }
