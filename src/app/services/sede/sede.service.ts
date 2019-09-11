import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Sede } from 'src/app/models/sede.model';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  totalSedes: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarSedes() {

    let url = URL_SERVICIOS + '/sede';
    return this.http.get(url)
        .pipe(
          map((resp: any) => {
            this.totalSedes = resp.total;
            return resp.sedes;
          })
        );
  }

  cargarSede( id: string ) {

    let url = URL_SERVICIOS + '/sede/' + id;

    return this.http.get( url )
      .pipe(
        map( (resp: any) => resp.sede )
      );
  }

  obtenerSede( id: string ) {

    let url = URL_SERVICIOS + '/sede/' + id;
    return this.http.get( url )
      .pipe(
        map( (resp: any) => resp.sede )
      );
  }

  buscarSede( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/sedes/' + termino;
    return this.http.get( url )
                .pipe(
                  map( (resp: any) => resp.sedes)
                );
  }

  borrarSede(id: string) {

    let url = URL_SERVICIOS + '/sede/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
        .pipe(
          map((resp: any) => {
            Swal.fire({
              title: 'Sede borrada',
              type: 'success',
              text: 'La sede ha sido borrada correctamente'
            });
            return resp;
          })
        );
  }

  actualizarSede( sede: Sede ) {

    let url = URL_SERVICIOS + '/sedde/' + sede._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, sede )
      .pipe(
        map( (resp: any) => {

          Swal.fire({
            title: 'Hospital Actualiado',
            type: 'success',
            text: sede.nombre
          });
          return resp.hospital;
        })
      );
  }


  guardarSede( sede: Sede ) {

    let url = URL_SERVICIOS + '/sede';

    if ( sede._id ) {
      // actualizando
      url += '/' + sede._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, sede )
        .pipe(
          map( (resp: any) => {
                      Swal.fire({
                        title: 'Sede Actualizada',
                        type: 'success',
                        text: sede.nombre
                      });
                      return resp.sede;
                    })
        );

    } else {
      // creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post( url, sede )
        .pipe(
          map( (resp: any) => {
                    Swal.fire({
                      title: 'Sede Creada',
                      type: 'success',
                      text: sede.nombre
                    });
                    return resp.sede;
                  })
        );
    }
  }
}
