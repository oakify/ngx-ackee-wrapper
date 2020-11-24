import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AckeeService } from 'projects/lib/src/public-api';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private ackeeServ: AckeeService, private router: Router) {
    // Don't track route changes:
    // this.ackeeServ.create();

    // Track route changes:
    this.ackeeServ.create(
      this.router.events.pipe(filter((evt) => evt instanceof NavigationEnd))
    );
  }
}
