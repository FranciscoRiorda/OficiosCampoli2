import { OnInit, Component } from '@angular/core';
import { Coordinador } from '../../models/coordinador.model';
import { CoordinadorService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-coordinadores',
  templateUrl: './coordinadores.component.html',
  styles: []
})
export class CoordinadoresComponent implements OnInit {

  coordinadores: Coordinador[] = [];

  constructor(
    public _coordinadorService: CoordinadorService
  ) { }

  ngOnInit() {

    this.cargarCoordinadores();
  }

  cargarCoordinadores() {
    this._coordinadorService.cargarCoordinadores()
          .subscribe( coordinadores => this.coordinadores = coordinadores);
  }

  buscarCoordinador( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarCoordinadores();
      return;
    }

    this._coordinadorService.buscarCoordinadores( termino )
            .subscribe( coordinadores =>  this.coordinadores = coordinadores );
  }

  borrarCoordinador(coordinador: Coordinador) {

    Swal.fire({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + coordinador.nombre,
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    })
    .then (borrar => {

      if (borrar.value) {

        this._coordinadorService.borrarCoordinador(coordinador._id)
              .subscribe(() =>  this.cargarCoordinadores() );
      }
    });

  }
}
