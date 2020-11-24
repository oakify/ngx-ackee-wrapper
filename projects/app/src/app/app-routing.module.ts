import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CompaComponent } from './compa/compa.component';
import { CompbComponent } from './compb/compb.component';

const routes: Routes = [
  { path: 'a', component: CompaComponent },
  { path: 'b', component: CompbComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
