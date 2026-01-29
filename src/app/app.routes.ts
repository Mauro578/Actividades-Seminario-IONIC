import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import {RegistroComponent} from './pages/registro/registro.component';
import { ListadoRegistrosComponent } from './pages/listado-registros/listado-registros.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: "perfil",
    component: PerfilComponent
  },
  {
    path:"galeria",
    component: GaleriaComponent
  },
  {
    path:"registro",
    component: RegistroComponent
  },
  {
    path:"listado-registros",
    component: ListadoRegistrosComponent
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.page').then( m => m.GalleryPage)
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.page').then( m => m.ChatPage)
  },
  {
    path: 'rm-graphql',
    loadComponent: () => import('./rm-graphql/rm-graphql.page').then( m => m.RmGraphqlPage)
  },
  {
    path: 'map-explorer',
    loadComponent: () => import('./pages/map-explorer/map-explorer.page').then( m => m.MapExplorerPage)
  },
  {
    path: 'media',
    loadComponent: () => import('./pages/media/media.page').then( m => m.MediaPage)
  },
];
