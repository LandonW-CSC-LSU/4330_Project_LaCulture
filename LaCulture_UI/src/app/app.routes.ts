import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: '**', redirectTo: '' }
];
