import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Datasets } from '../shared/dataset.model';



@Injectable({
  providedIn: 'root'
})
export class DatasetsService{
  constructor(private http:HttpClient){

  }


  public listAll():Observable<Datasets[]>{

    const url = `${localStorage.getItem('urlDomain')}/datasets`;

    const httpHeaders = new HttpHeaders()
    .set("Authorization","Basic cGNoZWxwdmVuZGFzOkp1NXREMCF0L1cwbg==")
    .set("Content-Type","application/json")
    .set("Access-Control-Allow-Origin","origin")
    .set("accept","application/json")
    .set("withCredentials","true");


    return this.http.get(url,{headers:httpHeaders}).pipe(
      map(this.mapToDatasets)
    )
  }

  public getListAll(){
    const url = `${localStorage.getItem('urlDomain')}/datasets`;

    const httpHeaders = new HttpHeaders()
    .set("Authorization","Basic cGNoZWxwdmVuZGFzOkp1NXREMCF0L1cwbg==")
    .set("Content-Type","application/json")
    .set("Access-Control-Allow-Origin","origin")
    .set("accept","application/json")
    .set("withCredentials","true");


    return this.http.get(url,{headers:httpHeaders});
  }

  public listById(id:number):Observable<Datasets>{

    const url = `${localStorage.getItem('urlDomain')}/datasets/${id}`;

    return this.http.get(url).pipe(
      map(this.mapToDataset)
    )
  }

  public savaNew(dataset:Datasets):Observable<Datasets>{
    const url = `${localStorage.getItem('urlDomain')}/datasets`;
    return this.http.post(url,dataset).pipe(
      map(this.mapToDataset)
    )
  }

  public update(dataset:Datasets):Observable<Datasets>{
    const url = `${localStorage.getItem('urlDomain')}/datasets/${dataset.id}`;
    return this.http.put(url,dataset).pipe(
      map(this.mapToDataset)
    )
  }

  private mapToDataset(data:any):Datasets{
    const newData:any = data.data;
    return Object.assign(new Datasets, newData);

  }

  private mapToDatasets(data:any):Array<Datasets>{
    const listDatasets:Datasets[] = [];

    const newData:any[] = (data.data);

    newData.forEach((e:any) => listDatasets.push(Object.assign(new Datasets, e)))

    return listDatasets;
  }



}
