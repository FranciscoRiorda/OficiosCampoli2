import { OnInit, Component } from '@angular/core';
import { Sede } from '../../models/sede.model';
import { Coordinador } from '../../models/coordinador.model';
import { CoordinadorService, SedeService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-coordinador',
  templateUrl: './coordinador.component.html',
  styles: []
})
export class CoordinadorComponent implements OnInit {

  sedes: Sede[] = [];
  coordinador: Coordinador = new Coordinador('', '', '', null, '', null, null, '', '', '', '');
  sede: Sede = new Sede('');

  constructor(

    public _coordinadorService: CoordinadorService,
    public _sedeService: SedeService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService

  ) {
    this.activatedRoute.params.subscribe( params => {

      const id = params.id;

      if ( id !== 'nuevo' ) {
        this.cargarCoordinador( id );
      }

    });

  }


  ngOnInit() {

    this._sedeService.cargarSedes()
          .subscribe( sedes => this.sedes = sedes );

    this._modalUploadService.notificacion
          .subscribe( resp => {
            this.coordinador.img = resp.coordinador.img  ;
          });
  }

  cargarCoordinador( id: string ) {

    this._coordinadorService.cargarCoordinador( id )
          .subscribe( coordinador => {

            console.log( coordinador );
            this.coordinador = coordinador;
            this.coordinador.sede = coordinador.sede._id;
            this.cambioSede( this.coordinador.sede );
          });
  }

  guardarCoordinador( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this._coordinadorService.guardarCoordinador( this.coordinador )
            .subscribe( coordinador => {

              this.coordinador._id = coordinador._id;

              this.router.navigate(['/coordinador', coordinador._id ]);

            });

  }

  cambioSede( id: string ) {

    this._sedeService.obtenerSede( id )
          .subscribe( sede => this.sede = sede );

  }

  cambiarFoto() {

    this._modalUploadService.mostrarModal( 'coordinadores', this.coordinador._id );

  }


}
