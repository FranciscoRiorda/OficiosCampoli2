import {RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';

import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SedesComponent } from './sedes/sedes.component';
import { SedeComponent } from './sedes/sede.component';
import { CursosComponent } from './cursos/cursos.component';
import { CursoComponent } from './cursos/curso.component';
import { DocentesComponent } from './docentes/docentes.component';
import { DocenteComponent } from './docentes/docente.component';
import { CoordinadoresComponent } from './coordinadores/coordinadores.component';
import { CoordinadorComponent } from './coordinadores/coordinador.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            {path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
            {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
            {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'}},
            {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
            {path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
            {path: 'account-settings', component: AccoutSettingsComponent, data: {titulo: 'Ajustes del Tema'}},
            {path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}},

            //Mantenimientos
            {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de usuarios'}},
            {path: 'sedes', component: SedesComponent, data: {titulo: 'Mantenimiento de sedes'}},
            {path: 'sede/:id', component: SedeComponent, data: {titulo: 'Actualización de sede'}},
            {path: 'cursos', component: CursosComponent, data: {titulo: 'Mantenimiento de cursos'}},
            {path: 'curso/:id', component: CursoComponent, data: {titulo: 'Actualización de curso'}},
            {path: 'docentes', component: DocentesComponent, data: {titulo: 'Mantenimiento de docentes'}},
            {path: 'docente/:id', component: DocenteComponent, data: {titulo: 'Actualización de docente'}},
            {path: 'coordinadores', component: CoordinadoresComponent, data: {titulo: 'Mantenimiento de coordinadores'}},
            {path: 'coordinador/:id', component: CoordinadorComponent, data: {titulo: 'Actualizar Coordindador'}},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
        },
];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);