import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin:FormGroup;

  constructor(private fb:FormBuilder, private loginService:LoginService, private route:Router, private toast:ToastrService) {
    this.formLogin = this.criarFormLogin();
   }

  ngOnInit(): void {
  }

  public criarFormLogin():FormGroup{
    return this.fb.group({
      domain: ["",Validators.required],
      username:["",[Validators.required,Validators.minLength(3)]],
      password:["",[Validators.required,Validators.minLength(3)]]
    })
  }

  public isFormControlInvalid(controlName:string):boolean{
    return !!(this.formLogin.get(controlName)?.invalid && this.formLogin.get(controlName)?.touched);
  }

  public submitForm(){
    const {domain,username, password} = this.formLogin.value;
    this.formLogin.reset();
    const logado = this.loginService.login(domain,username,password);
    if(logado){
      this.toast.success("Login efetuado com sucesso.");
      this.route.navigate([''])
    }else{
      this.toast.error("Falha ao efetuar o login, tente novamente.");

    }
  }

}
