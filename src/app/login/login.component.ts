import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { element } from 'protractor';

declare function init_plugins();
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recordar: boolean = false;

  auth2: any;

  constructor( public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || "";
    if (this.email.length > 1) {
      this.recordar = true;
    }
  }

  googleInit() {

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '929774454272-pkh765cukpf86cts4dtbanlsllbb13e1.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin( element ) {

    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      //let profile = googleUser.getBasicProfile();

      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token)
              .subscribe(() => window.location.href = '#/dashboard');

    });
  }

  ingresar( forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recordar)
            .subscribe(correcto => this.router.navigate(['/dashboard']));

    //this.router.navigate(['/dashboard']);
  }

}
