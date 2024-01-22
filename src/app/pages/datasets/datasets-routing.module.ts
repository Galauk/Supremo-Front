import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatasetsListComponent } from './datasets-list/datasets-list.component';
import { DatasetsNewComponent } from './datasets-new/datasets-new.component';
import { DatasetsEditComponent } from './datasets-edit/datasets-edit.component';

const routes: Routes = [
  {path:'',component:DatasetsListComponent},
  {path:'new',component:DatasetsNewComponent},
  {path:'edit/:id',component:DatasetsEditComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatasetsRoutingModule { }
