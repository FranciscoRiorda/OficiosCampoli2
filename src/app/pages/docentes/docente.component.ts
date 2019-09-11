import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Curso } from 'src/app/models/curso.model';
import { Docente } from 'src/app/models/docente.model';
import { DocenteService, CursoService } from 'src/app/services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styles: []
})
export class DocenteComponent implements OnInit {

  cursos: Curso[] = [];
  docente: Docente = new Docente('', '', '', null, '', null, null, '', '', '', '');
  curso: Curso = new Curso('');

  constructor(
    public _docenteService: DocenteService,
    public _cursoService: CursoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    this.activatedRoute.params.subscribe( params => {

      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarDocente( id );
      }

    });
   }

  ngOnInit() {

    this._cursoService.cargarCursos()
      .subscribe(cursos => this.cursos = cursos);

    this._modalUploadService.notificacion
          .subscribe( resp => {
            this.docente.img = resp.docente.img;
          });
  }

  cargarDocente( id: string ) {

    this._docenteService.cargarDocente( id )
          .subscribe( docente => {

            console.log( docente );
            this.docente = docente;
            this.docente.curso = docente.curso._id;
            this.cambioCurso( this.docente.curso );
          });
  }

  guardarDocente(f: NgForm) {

    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._docenteService.guardarDocente(this.docente)
      .subscribe(docente => {

        this.docente._id = docente._id;

        this.router.navigate(['/docente', docente._id]);
      });

  }

  cambioCurso(id: string) {

    this._cursoService.obtenerCurso(id)
      .subscribe(curso => this.curso = curso);
  }

  cambiarFoto() {

    this._modalUploadService.mostrarModal( 'docentes', this.docente._id );

  }

}
