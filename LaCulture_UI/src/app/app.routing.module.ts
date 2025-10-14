import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Audubonzoo } from './components/audubonzoo/audubonzoo';
import { Bourbonstreet } from './components/bourbonstreet/bourbonstreet';
import { Brennans } from './components/brennans/brennans';
import { Cafedumonde } from './components/cafedumonde/cafedumonde';
import { Frenchquarter } from './components/frenchquarter/frenchquarter';
import { Marielaveau } from './components/marielaveau/marielaveau';
import { Statecapitol } from './components/statecapitol/statecapitol';
import { Superdome } from './components/superdome/superdome';
import { Tigerstadium } from './components/tigerstadium/tigerstadium';
import { Ww2museum } from './components/ww2museum/ww2museum';

export const routes: Routes = [
    { path: 'audubonzoo', component: Audubonzoo},
    { path: '', redirectTo: '/audubonzoo', pathMatch: 'full'},
    { path: '**', redirectTo: '/audubonzoo'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}