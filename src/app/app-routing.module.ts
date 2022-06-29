import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { HomeRoutingModule } from './template-pages/home/home-routing.module';
import { DetailRoutingModule } from './template-pages/detail/detail-routing.module';
import { MainContentComponent } from './components/pages/main-content/main-content.component';
import { AlertSimulationPageComponent } from './components/pages/alert-simulation-page/alert-simulation-page.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  { path: '', component: MainContentComponent },
  { path: 'alert-simulation', component: AlertSimulationPageComponent },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', enableTracing: true}),
    HomeRoutingModule,
    DetailRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
