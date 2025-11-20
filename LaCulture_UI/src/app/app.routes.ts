import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { MapComponent } from './components/map/map';
import { EventsComponent } from './components/events/events';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AboutComponent } from './components/about/about';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'map', component: MapComponent },
  { path: 'events', component: EventsComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'about', component: AboutComponent},
  { path: '**', redirectTo: '' }
];
