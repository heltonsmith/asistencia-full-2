import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { redirectIfAuthGuard } from './guard/redirect-if-auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'alumno',
    loadChildren: () => import('./pages/alumno/alumno.module').then( m => m.AlumnoPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'asistencia/:codigo/:usuario/:fecha',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'docente',
    loadChildren: () => import('./pages/docente/docente.module').then( m => m.DocentePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [redirectIfAuthGuard]
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'not-found',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**', // Ruta comodín que captura todas las rutas no definidas
    redirectTo: 'not-found', // Redirige a la ruta 'not-found'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export {routes};
