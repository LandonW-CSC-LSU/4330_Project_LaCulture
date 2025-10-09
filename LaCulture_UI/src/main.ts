import './polyfills';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { HomeComponent } from './app/components/home/home.component';

// Add provideAnimations() to the providers array
appConfig.providers = [
  ...(appConfig.providers || []),
  provideAnimations()
];

bootstrapApplication(HomeComponent, appConfig)
  .catch((err) => console.error(err));
