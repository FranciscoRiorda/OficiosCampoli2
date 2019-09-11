import { Component, OnInit } from '@angular/core';
import { Sede } from 'src/app/models/sede.model';
import { SedeService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styles: []
})
export class SedesComponent implements OnInit {

  sedes: Sede[] = [];

  cargando: boolean = false;

  constructor(
    public _sedeService: SedeService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarSedes();

    this._modalUploadService.notificacion
          .subscribe( () => this.cargarSedes() );

  }

  buscarSede( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarSedes();
      return;
    }

    this._sedeService.buscarSede( termino )
            .subscribe( sedes => this.sedes = sedes );

  }


  cargarSedes() {
    this._sedeService.cargarSedes()
          .subscribe( sedes => this.sedes = sedes);
  }

  guardarSede( sede: Sede) {

    this._sedeService.actualizarSede( sede )
            .subscribe();

  }

  borrarSede(sede: Sede) {

    Swal.fire({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + sede.nombre,
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    })
    .then (borrar => {

      if (borrar.value) {

        this._sedeService.borrarSede(sede._id)
              .subscribe(borrado => {
                this.cargarSedes();
              });

      }
    });

  }

  actualizarImagen( sede: Sede ) {

    this._modalUploadService.mostrarModal( 'sedes', sede._id );

  }
  }
