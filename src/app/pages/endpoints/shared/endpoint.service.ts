import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Endpoints } from '../shared/endpoint.model';


@Injectable({
  providedIn: 'root'
})
export class EndpointsService{
  constructor(private http:HttpClient){

  }

  public listAll():Observable<Endpoints[]>{

    const url = `${localStorage.getItem('urlDomain')}/endpoints`;

    const httpHeaders = new HttpHeaders()
    .set("Authorization","Basic cGNoZWxwdmVuZGFzOkp1NXREMCF0L1cwbg==")
    .set("Content-Type","application/json")
    .set("Access-Control-Allow-Origin","origin")
    .set("accept","application/json")
    .set("withCredentials","true");


    return this.http.get(url,{headers:httpHeaders}).pipe(
      map(this.mapToEndpoints)
    )
  }

  public listById(id:number):Observable<Endpoints>{
    const url = `${localStorage.getItem('urlDomain')}/endpoints/${id}`;

    return this.http.get(url).pipe(
      map(this.mapToEndpoint)
    )
  }

  public savaNew(dataset:Endpoints):Observable<Endpoints>{
    const url = `${localStorage.getItem('urlDomain')}/endpoints`;
    return this.http.post(url,{dataset}).pipe(
      map(this.mapToEndpoint)
    )
  }

  public update(data:Endpoints):Observable<Endpoints>{
    const url = `${localStorage.getItem('urlDomain')}/endpoints/${data.id}`;
    return this.http.put(url,data).pipe(
      map(this.mapToEndpoint)
    )
  }

  private mapToEndpoint(data:any):Object{
    const item:any = data.data[0];
    return item;
  }

  private mapToEndpoints(data:any):Array<Endpoints>{
    const listEndpoints:Endpoints[] = [];
    const newData:any[] = (data.data);
    newData.forEach((e:any) => listEndpoints.push(Object.assign(new Endpoints, e)))

    return listEndpoints;
  }

}
