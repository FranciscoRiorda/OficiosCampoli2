import { NgModule } from "@angular/core";

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

// ng2-Charts
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';

import { PAGES_ROUTES } from './pages.routes';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';


import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { SedesComponent } from './sedes/sedes.component';
import { SedeComponent } from './sedes/sede.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursoComponent } from './cursos/curso.component';
import { DocentesComponent } from './docentes/docentes.component';
import { DocenteComponent } from './docentes/docente.component';
import { CoordinadoresComponent } from './coordinadores/coordinadores.component';
import { CoordinadorComponent } from './coordinadores/coordinador.component';
import { BusquedaComponent } from './busqueda/busqueda.component';




@NgModule({
    declarations: [
        //PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccoutSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        // ModalUploadComponent,
        SedesComponent,
        CursosComponent,
        SedeComponent,
        CursoComponent,
        DocentesComponent,
        DocenteComponent,
        CoordinadoresComponent,
        CoordinadorComponent,
        BusquedaComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule

    ]
})

export class PagesModule {}



