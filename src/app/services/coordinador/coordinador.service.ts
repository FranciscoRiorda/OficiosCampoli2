import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Coordinador } from '../../models/coordinador.model';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class CoordinadorService {

  totalCoordinadores: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarCoordinadores() {

    let url = URL_SERVICIOS + '/coordinador';

    return this.http.get( url )
    .pipe(
      map( (resp: any) => {

        this.totalCoordinadores = resp.total;
        return resp.coordinadores;
      })
    );
  }

  cargarCoordinador( id: string ) {

    let url = URL_SERVICIOS + '/coordinador/' + id;

    return this.http.get( url )
      .pipe(
        map( (resp: any) => resp.coordinador )
      );
  }

  buscarCoordinadores( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/coordinadores/' + termino;
    return this.http.get( url )
                .pipe(
                  map( (resp: any) => resp.coordinadores)
                );
  }

  borrarCoordinador( id: string ) {

    let url = URL_SERVICIOS + '/coordinador/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
      .pipe(
        map( resp => {
          Swal.fire({
            title: 'Coordinador borrado',
            type: 'success',
            text: 'El coordinador ha sido borrado correctamente'
          });
          return resp;
        })
      );
  }

  guardarCoordinador( coordinador: Coordinador ) {

    let url = URL_SERVICIOS + '/coordinador';

    if ( coordinador._id ) {
      // actualizando
      url += '/' + coordinador._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, coordinador )
        .pipe(
          map( (resp: any) => {
                      Swal.fire({
                        title: 'Coordinador Actualizado',
                        type: 'success',
                        text: coordinador.apellido
                      });
                      return resp.coordinador;
                    })
        );

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, coordinador )
        .pipe(
          map( (resp: any) => {
                    Swal.fire({
                      title: 'Coordinador Creado',
                      type: 'success',
                      text: coordinador.apellido
                    });
                    return resp.coordinador;
                  })
        );
    }
  }

}
