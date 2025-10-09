import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { MapComponent } from './components/map/map';
import { EventsComponent } from './components/events/events';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'map', component: MapComponent },
  { path: 'events', component: EventsComponent },
  { path: '**', redirectTo: '' }
];
