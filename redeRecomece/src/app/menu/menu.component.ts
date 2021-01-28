import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { UserLogin } from './../model/UserLogin';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()
  user: User = new User
  confirmarSenha: string
  TipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value

  }

  tipoUser(event: any) {
    this.TipoUsuario = event.target.value
  }

  cadastrar() {
    this.user.tipo = this.TipoUsuario

    if (this.user.senha != this.confirmarSenha) {
      alert('A senha estão incorretas.')
    }

    else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
       // this.router.navigate(['/menu'])
        alert('Usuário cadastrado com sucesso!')
      })
    }
  }

  entrar() {
    this.authService.entrar(this.userLogin).subscribe((resp: UserLogin)=>{
      this.userLogin = resp

     environment.token = this.userLogin.token
     environment.nome = this.userLogin.nome
     environment.foto = this.userLogin.foto
     environment.id = this.userLogin.id

     console.log(environment.token)
     console.log( environment.nome)
     console.log(environment.foto)
     console.log(environment.id)
      this.userLogin.foto
      //this.router.navigate(['/inicio'])

    }, erro=>{
      if(erro.status == 500){
        alert('Usuario ou senha incorretos')
      }
    })
  }
}