import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompaComponent } from './compa/compa.component';
import { CompbComponent } from './compb/compb.component';
import { environment } from '../environments/environment';

import { AckeeModule, AckeeConfig } from 'projects/lib/src/public-api';
// import { AckeeModule, AckeeOptions } from 'ngx-ackee-wrapper';

const ACKEE_CONFIG: AckeeConfig = {
  tracker: environment.ackeeUrl + '/tracker.js',
  server: environment.ackeeUrl,
  domainId: environment.ackeeDomainId,
  options: {
    ignoreLocalhost: false,
    detailed: true,
    // ignoreOwnVisits: true,
  },
  dev: true,
  ignore: !environment.production,
};

@NgModule({
  declarations: [AppComponent, CompaComponent, CompbComponent],
  imports: [BrowserModule, AppRoutingModule, AckeeModule.forRoot(ACKEE_CONFIG)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
