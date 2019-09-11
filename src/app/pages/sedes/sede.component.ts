import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Sede } from 'src/app/models/sede.model';
import { SedeService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styles: []
})
export class SedeComponent implements OnInit {

  sede: Sede = new Sede('', '', '', '');

  constructor(
    public _sedeService: SedeService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
     activatedRoute.params.subscribe( params => {

      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarSede( id );
      }

    });
   }

  ngOnInit() {

    this._modalUploadService.notificacion
          .subscribe( resp => {
            this.sede.img = resp.sede.img;
          });
  }

  cargarSede( id: string ) {
    this._sedeService.cargarSede( id )
          .subscribe( sede => {

            console.log( sede );
            this.sede = sede;
          });
  }

  guardarSede(f: NgForm) {

    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._sedeService.guardarSede(this.sede)
      .subscribe(sede => {

        this.sede._id = sede._id;

        this.router.navigate(['/sede', sede._id]);
      });


  }

  cambiarFoto() {

    this._modalUploadService.mostrarModal( 'sedes', this.sede._id );

  }

}
