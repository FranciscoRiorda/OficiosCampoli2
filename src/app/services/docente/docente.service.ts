import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Docente } from '../../models/docente.model';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  totalDocentes: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarDocentes() {

    let url = URL_SERVICIOS + '/docente';
    return this.http.get(url)
        .pipe(
          map((resp: any) => {
            this.totalDocentes = resp.total;
            return resp.docentes;
          })
        );
  }

  cargarDocente( id: string ) {

    let url = URL_SERVICIOS + '/docente/' + id;

    return this.http.get( url )
      .pipe(
        map( (resp: any) => resp.docente )
      );
  }

  buscarDocentes(termino: string) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/docentes/' + termino;
    return this.http.get(url)
        .pipe(
          map((resp: any) => resp.docentes)
        );
  }

  borrarDocente(id: string) {

    let url = URL_SERVICIOS + '/docente/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
        .pipe(
          map((resp: any) => {
            Swal.fire({
              title: 'Docente borrado',
              type: 'success',
              text: 'El docente ha sido borrado correctamente'
            });
            return resp;
          })
        );
  }

  guardarDocente( docente: Docente ) {

    let url = URL_SERVICIOS + '/docente';

    if ( docente._id ) {
      // actualizando
      url += '/' + docente._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, docente )
        .pipe(
          map( (resp: any) => {
                      Swal.fire({
                        title: 'Docente Actualizado',
                        type: 'success',
                        text: docente.apellido
                      });
                      return resp.docente;
                    })
        );

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, docente )
        .pipe(
          map( (resp: any) => {
                    Swal.fire({
                      title: 'Docente Creado',
                      type: 'success',
                      text: docente.apellido
                    });
                    return resp.docente;
                  })
        );
    }
  }

}
