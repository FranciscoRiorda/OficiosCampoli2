import { Component, OnInit } from '@angular/core';
import { Docente } from '../../models/docente.model';
import { DocenteService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styles: []
})
export class DocentesComponent implements OnInit {

  docentes: Docente[] = [];

  constructor(
    public _docenteService: DocenteService
  ) { }

  ngOnInit() {

    this.cargarDocentes();
  }

  cargarDocentes() {

    this._docenteService.cargarDocentes()
      .subscribe(docentes => this.docentes = docentes);

  }

  buscarDocentes(termino: string) {

    if (termino.length <= 0 ) {
      this.cargarDocentes();
      return;
    }

    this._docenteService.buscarDocentes(termino)
      .subscribe(docentes => this.docentes = docentes);
  }

  borrarDocente(docente: Docente) {

    Swal.fire({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + docente.nombre,
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    })
    .then (borrar => {

      if (borrar.value) {

        this._docenteService.borrarDocente(docente._id)
              .subscribe(() => this.cargarDocentes() );
      }
    });

  }
  }

