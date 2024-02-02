import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EndpointsService } from '../shared/endpoint.service';
import { Endpoints } from '../shared/endpoint.model';
import { CodeModel } from '@ngstack/code-editor';

@Component({
  selector: 'app-endpoints-edit',
  templateUrl: './endpoints-edit.component.html',
  styleUrls: ['./endpoints-edit.component.css']
})
export class EndpointsEditComponent implements OnInit {

  @Input() activeTheme = 'vs-dark';
  @Input() readOnly = false;
  @Input()

  public formEndpoint:FormGroup;

  public codeModelBody: CodeModel = {
    language: 'json',
    uri: 'main.json',
    value: '{}',
  };
  public codeModelOption: CodeModel = {
    language: 'json',
    uri: 'main2.json',
    value: '{}'
  }

  setCodeModel(newValue:string){
    return {
      language: 'json',
      uri: 'main.json',
      value: newValue,
    };
  }

  public options = {
    language:"typescript",
    theme:"vs-dark",
    contextmenu: true,
    minimap: {
      enabled: true
    }
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
    this.formEndpoint = this.buildFormEndpoint();
    const endpointId = Number(this.activeRoute.snapshot.paramMap.get('id'));


    this.endpointsService.listById(endpointId).subscribe(
      res =>{

        if(res.header && typeof res.header === 'object'){
          const headers = Object.entries(res.header);

          headers.forEach(([key, value]) => {
            this.adicionarHeader(key, value);
          });
        }
        res.header = [];

        const codeBody = JSON.stringify(res.body, null, "\t");
        this.codeModelBody = this.setCodeModel(codeBody);

        const codeOptions = JSON.stringify(res.options, null, "\t");
        this.codeModelOption = this.setCodeModel(codeOptions);

        this.formEndpoint.patchValue(res);
      },
      err =>{
        console.log(err);
        this.toastr.error(err);
      }
    )
  }

  get arrayControls() {
    return this.formEndpoint.get('header') as FormArray;
  }

  public adicionarHeader(key?:string, value?:string) {
    const controle = this.fb.group({
      key: [key, Validators.required],
      value: [value, Validators.required]
    });

    this.arrayControls.push(controle);
  }

  public removerHeader() {
    this.arrayControls.removeAt(this.arrayControls.length-1);
  }

  private buildFormEndpoint():FormGroup{
    return this.fb.group({
      id: [null],
      method: [null, Validators.required],
      url: [null, Validators.required],
      body: [null],
      options: [null],
      datasetId: [null],
      order: [null],
      executedAt: [null],
      toAuthenticate: [null],
      isActive: [null],
      header: this.fb.array([]),
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
