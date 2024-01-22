import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndpointsListComponent } from './endpoints-list/endpoints-list.component';
import { EndpointsNewComponent } from './endpoints-new/endpoints-new.component';
import { EndpointsEditComponent } from './endpoints-edit/endpoints-edit.component';

const routes: Routes = [
  {path:'',component:EndpointsListComponent},
  {path:'new',component:EndpointsNewComponent},
  {path:'edit/:id',component:EndpointsEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndpointsRoutingModule { }
