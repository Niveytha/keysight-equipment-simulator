import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms'

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './template-pages/home/home.module';
import { DetailModule } from './template-pages/detail/detail.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/pages/sidebar/sidebar.component';
import { MainContentComponent } from './components/pages/main-content/main-content.component';
import { BatchFormComponent } from './components/forms/batch-form/batch-form.component';
import { BtestFormComponent } from './components/forms/btest-form/btest-form.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { AlertSimulationPageComponent } from './components/pages/alert-simulation-page/alert-simulation-page.component';
import { FinalPageComponent } from './components/pages/final-page/final-page.component';

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader =>  new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
  declarations: [AppComponent, SidebarComponent, MainContentComponent, BatchFormComponent, BtestFormComponent, ButtonComponent, AlertSimulationPageComponent, FinalPageComponent],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    DetailModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
