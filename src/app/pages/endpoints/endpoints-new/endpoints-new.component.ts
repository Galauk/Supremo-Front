import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Endpoints } from '../shared/endpoint.model';
import { EndpointsService } from '../shared/endpoint.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-endpoints-new',
  templateUrl: './endpoints-new.component.html',
  styleUrls: ['./endpoints-new.component.css']
})
export class EndpointsNewComponent implements OnInit {

  public formEndpoint:FormGroup;

  @Output() newDataset:EventEmitter<Endpoints> = new EventEmitter();


  constructor(private fb:FormBuilder, private endpontsService:EndpointsService,private toastr:ToastrService) {
    this.formEndpoint = this.buildFormEndpoint();
  }

  ngOnInit(): void {
    this.adicionarHeader();
  }

  private buildFormEndpoint():FormGroup{
    return this.fb.group({
      method: [null, Validators.required],
      url: [null, Validators.required],
      headers: [null],
      body: [null],
      options: [null],
      datasetId: [null],
      order: [null],
      executedAt: [null],
      toAuthenticate: [null],
      isActive: [null],
      header: this.fb.array([])
    })
  }

  get arrayControls() {
    return this.formEndpoint.get('header') as FormArray;
  }

  public adicionarHeader() {
    const controle = this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    });

    this.arrayControls.push(controle);
  }

  public removerHeader() {
    this.arrayControls.removeAt(this.arrayControls.length-1);
  }

  public isFormControlInvalid(controlName:string):boolean{
    return !!(this.formEndpoint.get(controlName)?.invalid && this.formEndpoint.get(controlName)?.touched)
  }

  public saveNewEndpoints(){

    const newEndpoints: Endpoints = this.formEndpoint.value as Endpoints;

    this.endpontsService.savaNew(newEndpoints).subscribe(
      res => {
        this.toastr.success("Novo endpoint salvo com sucesso.");
        this.formEndpoint.reset();
        this.newDataset.emit(res);
      },
      err => {
        console.log(err);
        this.toastr.error("Falha ao salvar novo Dataset")
      }
    );

    console.log(this.formEndpoint.value);
  }


}
