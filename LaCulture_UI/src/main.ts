import './polyfills';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Add provideAnimations() to the providers array
appConfig.providers = [
  ...(appConfig.providers || []),
  provideAnimations()
];

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
