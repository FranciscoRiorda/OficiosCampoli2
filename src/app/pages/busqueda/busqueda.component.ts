import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Sede } from '../../models/sede.model';
import { Curso } from 'src/app/models/curso.model';
import { Docente } from '../../models/docente.model';
import { Coordinador } from '../../models/coordinador.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  sedes: Sede[] = [];
  cursos: Curso[] = [];
  docentes: Docente[] = [];
  coordinadores: Coordinador[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {

    activatedRoute.params
      .subscribe(params => {
        let termino = params['termino'];
        this.buscar(termino);
      });
   }

  ngOnInit() {
  }


  buscar(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get(url)
      .subscribe( (resp: any) => {

        console.log(resp);

        this.usuarios = resp.usuarios;
        this.sedes = resp.sedes;
        this.cursos = resp.cursos;
        this.docentes = resp.docentes;
        this.coordinadores = resp.coordinadores;
      });

  }

}
