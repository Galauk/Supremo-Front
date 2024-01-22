import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {
    path:'',
    canActivate:[AuthGuard],
    component:LayoutComponent,
    children:[
      {path:'', component:HomeComponent},
      {path:'datasets', loadChildren:()=> import('./pages/datasets/datasets.module').then(m=>m.DatasetsModule)},
      {path:'endpoints', loadChildren:()=> import('./pages/endpoints/endpoints.module').then(m=>m.EndpointsModule)}
    ]
  },
  {path:'**',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
