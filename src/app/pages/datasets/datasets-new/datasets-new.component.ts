import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatasetsService } from '../shared/dataset.service';
import { Datasets } from '../shared/dataset.model';
import { ToastrService } from 'ngx-toastr';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datasets-new',
  templateUrl: './datasets-new.component.html',
  styleUrls: ['./datasets-new.component.css']
})
export class DatasetsNewComponent implements OnInit {

  public formDataset:FormGroup;

  @Output() newDataset:EventEmitter<Datasets> = new EventEmitter();

  constructor(private fb:FormBuilder, private datasetsService:DatasetsService,private toastr:ToastrService ) {
    this.formDataset = this.buildFormDataset();
   }

  ngOnInit(): void {
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
    return !!(this.formDataset.get(controlName)?.invalid && this.formDataset.get(controlName)?.touched)
  }


  public saveNewDatasets(){

    const newDatasets: Datasets = this.formDataset.value as Datasets;

    this.datasetsService.savaNew(newDatasets).subscribe(
      res => {
        this.toastr.success("Novo dataset salvo com sucesso.");
        this.formDataset.reset();
        this.newDataset.emit(res);
      },
      err => {
        console.log(err);
        this.toastr.error("Falha ao salvar novo Dataset")
      }
    );

    console.log(this.formDataset.value);
  }

}
