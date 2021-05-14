import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './services/data-resolver/data-resolver.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  {
    path: 'home/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'newNote/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: () => import('./pages/new-note/new-note.module').then( m => m.NewNotePageModule)    
  },
  {
    path: 'notes-detail',
    loadChildren: () => import('./pages/notes-detail/notes-detail.module').then( m => m.NotesDetailPageModule)
  },
  {
    path: 'registry',
    loadChildren: () => import('./pages/registry/registry.module').then( m => m.RegistryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
