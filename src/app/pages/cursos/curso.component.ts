import { Component, OnInit } from '@angular/core';
import { Sede } from 'src/app/models/sede.model';
import { NgForm } from '@angular/forms';
import { Curso } from 'src/app/models/curso.model';
import { CursoService, SedeService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: []
})
export class CursoComponent implements OnInit {

  sedes: Sede[] = [];
  curso: Curso = new Curso('', null, null, '', '', '', '', '', '', '', '', '');
  sede: Sede = new Sede('');

  constructor(
    public _cursoService: CursoService,
    public _sedeService: SedeService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    this.activatedRoute.params.subscribe( params => {

      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarCurso( id );
      }

    });
   }

  ngOnInit() {

    this._sedeService.cargarSedes()
      .subscribe(sedes => this.sedes = sedes);

    this._modalUploadService.notificacion
          .subscribe( resp => {
            this.curso.img = resp.curso.img;
          });
  }

  cargarCurso( id: string ) {

    this._cursoService.cargarCurso( id )
          .subscribe( curso => {

            console.log( curso );
            this.curso = curso;
            this.curso.sede = curso.sede._id;
            this.cambioSede( this.curso.sede );
          });
  }

  guardarCurso(f: NgForm) {

    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._cursoService.guardarCurso(this.curso)
      .subscribe(curso => {

        this.curso._id = curso._id;

        this.router.navigate(['/curso', curso._id]);
      });

  }

  cambioSede(id: string) {

    this._sedeService.obtenerSede(id)
      .subscribe(sede => this.sede = sede);
  }

  cambiarFoto() {

    this._modalUploadService.mostrarModal( 'cursos', this.curso._id );

  }

}
