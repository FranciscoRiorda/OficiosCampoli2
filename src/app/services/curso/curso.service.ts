import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Curso } from 'src/app/models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  totalCursos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarCursos() {

    let url = URL_SERVICIOS + '/curso';
    return this.http.get(url)
        .pipe(
          map((resp: any) => {
            this.totalCursos = resp.total;
            return resp.cursos;
          })
        );
  }

  cargarCurso( id: string ) {

    let url = URL_SERVICIOS + '/curso/' + id;

    return this.http.get( url )
      .pipe(
        map( (resp: any) => resp.curso )
      );
  }

  obtenerCurso( id: string ) {

    let url = URL_SERVICIOS + '/curso/' + id;
    return this.http.get( url )
      .pipe(
        map( (resp: any) => resp.curso )
      );
  }

  buscarCurso(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/cursos/' + termino;
    return this.http.get(url)
        .pipe(
          map((resp: any) => resp.cursos)
        );
  }

  borrarCurso(id: string) {

    let url = URL_SERVICIOS + '/curso/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
        .pipe(
          map((resp: any) => {
            Swal.fire({
              title: 'Curso borrado',
              type: 'success',
              text: 'El curso ha sido borrado correctamente'
            });
            return resp;
          })
        );
  }


  guardarCurso( curso: Curso ) {

    let url = URL_SERVICIOS + '/curso';

    if ( curso._id ) {
      // actualizando
      url += '/' + curso._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, curso )
        .pipe(
          map( (resp: any) => {
                      Swal.fire({
                        title: 'Curso Actualizado',
                        type: 'success',
                        text: curso.nombre
                      });
                      return resp.curso;
                    })
        );

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, curso )
        .pipe(
          map( (resp: any) => {
                    Swal.fire({
                      title: 'Curso Creado',
                      type: 'success',
                      text: curso.nombre
                    });
                    return resp.curso;
                  })
        );
    }
  }

}
