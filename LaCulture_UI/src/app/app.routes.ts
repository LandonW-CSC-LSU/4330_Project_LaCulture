import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { MapComponent } from './components/map/map';
import { EventsComponent } from './components/events/events';
import { AboutComponent } from './components/about/about';
import { CalendarComponent } from './components/calendar/calendar.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'map', component: MapComponent },
  { path: 'events', component: EventsComponent },
  { path: 'about', component: AboutComponent},
  { path: 'Calendar', component: CalendarComponent },
  { path: '**', redirectTo: '' }
];
