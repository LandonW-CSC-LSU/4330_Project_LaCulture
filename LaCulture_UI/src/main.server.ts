import './polyfills';
import { bootstrapApplication, type BootstrapContext } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { HomeComponent } from './app/components/home/home.component';

const bootstrap = (context: BootstrapContext) => bootstrapApplication(HomeComponent, config, context);

export default bootstrap;