import { HttpClient } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn:'root'
})
export class LoginService{
  constructor(private http:HttpClient,private route:Router){

  }

  public login(domain:string,username:string,password:string):boolean{
    if(username == "pchelpvendas" && password == "Ju5tD0!t/W0n"){
      this.setTokenLocalStorage(btoa(username+":"+password));
      this.setDomainLocalStorage(domain);
      return true;
    }
    return false;
  }

  public logout():void{
    this.removerTokenLocalStorage();
    this.removeDomainLocalStorage();
    this.route.navigate(['login']);
  }

  public getToken():string | null{
    return localStorage.getItem("token");
  }

  private setTokenLocalStorage(data:any):void{
    localStorage.setItem("token" , "Basic "+data);
  }

  private removerTokenLocalStorage():void{
    localStorage.removeItem("token");

  }

  private setDomainLocalStorage(data:string):void{
    localStorage.setItem("urlDomain", data);
  }

  private removeDomainLocalStorage():void{
    localStorage.removeItem("urlDomain");
  }

}
