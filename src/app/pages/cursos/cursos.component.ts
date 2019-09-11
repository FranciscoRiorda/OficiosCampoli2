import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursoService } from 'src/app/services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styles: []
})
export class CursosComponent implements OnInit {

  cursos: Curso[] = [];

  constructor(
    public _cursoService: CursoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {

    this.cargarCursos();

    // this._modalUploadService.notificacion
    //   .subscribe(() => this.cargarCursos());
  }

  cargarCursos() {
    this._cursoService.cargarCursos()
          .subscribe( cursos => this.cursos = cursos);
  }

  buscarCurso(termino: string) {
    if (termino.length <= 0 ) {
      this.cargarCursos();
      return;
    }

    this._cursoService.buscarCurso(termino)
      .subscribe(cursos => this.cursos = cursos);
  }

  borrarCurso(curso: Curso) {

    Swal.fire({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + curso.nombre,
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    })
    .then (borrar => {

      if (borrar.value) {

        this._cursoService.borrarCurso(curso._id)
              .subscribe(borrado => {
                this.cargarCursos();
              });

      }
    });

  }
  }



