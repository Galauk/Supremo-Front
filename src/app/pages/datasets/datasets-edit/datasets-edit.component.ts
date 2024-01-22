import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatasetsService } from '../shared/dataset.service';
import { Datasets } from '../shared/dataset.model';

@Component({
  selector: 'app-datasets-edit',
  templateUrl: './datasets-edit.component.html',
  styleUrls: ['./datasets-edit.component.css']
})
export class DatasetsEditComponent implements OnInit {

  public formDataset:FormGroup;

  constructor(
    private fb:FormBuilder,
    private datasetService:DatasetsService,
    private toastr:ToastrService,
    private router:Router,
    private activeRoute:ActivatedRoute
    ) {
    this.formDataset = this.buildFormDataset();

  }

  ngOnInit(): void {
    const datasetId = Number(this.activeRoute.snapshot.paramMap.get('id'));


    this.datasetService.listById(datasetId).subscribe(
      res =>{
        this.formDataset.patchValue(res)
      },
      err =>{
        console.log(err);
        this.toastr.error(err);
      }
    )


  }

  private buildFormDataset():FormGroup{
    return this.fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      artefact: [null, Validators.required],
      type: [null],
      isActive: [null],
      dataFormat: [null]
    })
  }

  public isFormControlInvalid(controlName:string):boolean{
    return !!(this.formDataset.get(controlName)?.invalid && this.formDataset.get(controlName)?.touched);
  }

  public updateDataset(){

    const dataset:Datasets = this.formDataset.value as Datasets;

    this.datasetService.update(dataset).subscribe(
      res => {
        this.toastr.success("Dataset atualizado.");
        this.router.navigate(['datasets'])
      },
      err => {
        this.toastr.error("Falha ao atualizar Dataset.");
      }
    )

  }

}
