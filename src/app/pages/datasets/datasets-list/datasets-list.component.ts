import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DatasetsService } from '../shared/dataset.service';
import { Datasets } from '../shared/dataset.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-datasets-list',
  templateUrl: './datasets-list.component.html',
  styleUrls: ['./datasets-list.component.css'],
})


export class DatasetsListComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['id','name','artefact','functions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public listDatasets:Array<Datasets> = [];

  constructor(private datasetsService:DatasetsService) { }

  ngOnInit(): void {
    this.datasetsService.listAll().subscribe(
      res => {
        this.listDatasets = res;
        this.dataSource.data = res;
      },
      err => {console.log(err)}
    )
  }


  public updateList($event:Datasets){
    this.listDatasets.push($event);
  }

}
