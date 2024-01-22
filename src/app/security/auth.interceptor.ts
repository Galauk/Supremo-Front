import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable()

export class AuthInterceptor implements HttpInterceptor{

  constructor(private loginService:LoginService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const meuToken = this.loginService.getToken();
    if(meuToken !== null){
      const httpHeaders:HttpHeaders = new HttpHeaders()
      .set("Authorization",meuToken)
      .set("Content-Type","application/json")
      .set("withCredentials","true");

      const authRequest = req.clone({
        withCredentials:true,
        headers: httpHeaders })

      return next.handle(authRequest);
    }
    return next.handle(req);
  }

}
