import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
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

  public update(dataset:Endpoints):Observable<Endpoints>{
    const url = `${localStorage.getItem('urlDomain')}/endpoints/${dataset.id}`;
    return this.http.put(url,{dataset}).pipe(
      map(this.mapToEndpoint)
    )
  }

  private mapToEndpoint(data:any):Object{

    const item:any = data.data[0];

    const formItem = {
      id: item.id,
      method: item.method,
      url: item.url,
      header: {
       "Content-Type": item.header?.["Content-Type"] || "",
       "AppKey": item.header?.["AppKey"] || "",
       "AppId": item.header?.["AppId"] || ""
      },
      body: {
       data: item.body?.data || ""
      },
      options: {
       settings: {
          apiInfo: {
           version: item.options?.settings?.apiInfo?.version || "",
           requestRate: item.options?.settings?.apiInfo?.requestRate || 0
          },
          operationInfo: {
           type: item.options?.settings?.operationInfo?.type || ""
          },
          sourceInfo: {
           datasetId: item.options?.settings?.sourceInfo?.datasetId || null,
           identificationFields: {
              origin: item.options?.settings?.sourceInfo?.identificationFields?.origin || [],
              destination: item.options?.settings?.sourceInfo?.identificationFields?.destination || []
           }
          }
       },
       auth: {
          endpoint: item.options?.auth?.endpoint || ""
       }
      },
      datasetId: item?.datasetId || null,
      order: item?.order || 0,
      executedAt: item?.executedAt || null,
      toAuthenticate: item?.toAuthenticate || false,
      isActive: item?.isActive || false
    };

    console.log("formitem");
    console.log(formItem);

    //return formItem;



    console.log("item");
    console.log(item);

    //item.header = JSON.stringify(item.header);
    //item.body = JSON.stringify(item.body);
    item.options = JSON.stringify(item.options);


    return item;
//    return Object.assign(new Endpoints, formItem);

  }

  private mapToEndpoints(data:any):Array<Endpoints>{
    const listEndpoints:Endpoints[] = [];
    const newData:any[] = (data.data);
    newData.forEach((e:any) => listEndpoints.push(Object.assign(new Endpoints, e)))

    return listEndpoints;
  }

}
