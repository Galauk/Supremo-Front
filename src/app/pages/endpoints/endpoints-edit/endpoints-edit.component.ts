import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EndpointsService } from '../shared/endpoint.service';
import { Endpoints } from '../shared/endpoint.model';

@Component({
  selector: 'app-endpoints-edit',
  templateUrl: './endpoints-edit.component.html',
  styleUrls: ['./endpoints-edit.component.css']
})
export class EndpointsEditComponent implements OnInit {

  public formEndpoint:FormGroup;

  public headers = {
    array: [
     { key: 'Chave 1', valor: 'Valor 1'},
     { key: 'Chave 2', valor: 'Valor 2'},
     { key: 'Chave 3', valor: 'Valor 3'}
    ]
  };
  constructor(
    private fb:FormBuilder,
    private endpointsService:EndpointsService,
    private toastr:ToastrService,
    private router:Router,
    private activeRoute:ActivatedRoute
    ) {
    this.formEndpoint = this.buildFormEndpoint();

  }

  ngOnInit(): void {
    const endpointId = Number(this.activeRoute.snapshot.paramMap.get('id'));


    this.endpointsService.listById(endpointId).subscribe(
      res =>{
        this.formEndpoint.patchValue(res)
      },
      err =>{
        console.log(err);
        this.toastr.error(err);
      }
    )


  }

  private buildFormEndpoint():FormGroup{
    return this.fb.group({
      id: [null],
      method: [null, Validators.required],
      url: [null, Validators.required],
      header: {
        Authorization: [null],
        content: [null]
      },
      body: [null],
      options: [null],
      datasetId: [null],
      order: [null],
      executedAt: [null],
      toAuthenticate: [null],
      isActive: [null]
    })
  }

  public isFormControlInvalid(controlName:string):boolean{
    return !!(this.formEndpoint.get(controlName)?.invalid && this.formEndpoint.get(controlName)?.touched);
  }

  public updateDataset(){

    const endpoint:Endpoints = this.formEndpoint.value as Endpoints;

    this.endpointsService.update(endpoint).subscribe(
      res => {
        this.toastr.success("Endpoint atualizado.");
        this.router.navigate(['endpoints'])
      },
      err => {
        this.toastr.error("Falha ao atualizar Endpoint.");
      }
    )

  }

  public onUpdate(){
    console.log(this.formEndpoint.value);
  }

}
