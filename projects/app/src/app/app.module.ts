import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompaComponent } from './compa/compa.component';
import { CompbComponent } from './compb/compb.component';

import { AckeeModule, AckeeOptions } from 'projects/lib/src/public-api';
// import { AckeeModule, AckeeOptions } from 'ngx-ackee-wrapper';

const ACKEE_CONFIG: AckeeOptions = {
  tracker: 'https://example.com/tracker.js',
  server: 'https://example.com',
  domainId: '12312311-1234-1234-1234-123412341234',
  options: {
    // ignoreLocalhost: true,
    detailed: true,
    // ignoreOwnVisits: true,
  },
  dev: true,
};

@NgModule({
  declarations: [AppComponent, CompaComponent, CompbComponent],
  imports: [BrowserModule, AppRoutingModule, AckeeModule.forRoot(ACKEE_CONFIG)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
