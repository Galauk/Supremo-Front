import { Component, OnInit, ViewChild } from '@angular/core';
import { Endpoints } from '../shared/endpoint.model';
import { EndpointsService } from '../shared/endpoint.service';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-endpoints-list',
  templateUrl: './endpoints-list.component.html',
  styleUrls: []
})
export class EndpointsListComponent implements OnInit {
  displayedColumns: string[] = ['id','method','url','functions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public listEndpoints:Array<Endpoints> = [];

  constructor(private endpointService:EndpointsService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.endpointService.listAll().subscribe(
      res => {
        this.listEndpoints = res;
        this.dataSource.data = res
      },
      err => {
        console.log(err);
        this.toastr.error("Erro ao carregar informações.")
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public updateList($event:Endpoints){
    this.listEndpoints.push($event);
  }

  public removerEndpoints(datasetId?:number | null){
    console.log("remove dataset de id:", datasetId);
  }


}
