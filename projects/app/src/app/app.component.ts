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
  actionId: string;
  constructor(private ackeeServ: AckeeService, private router: Router) {
    // Don't track route changes:
    // this.ackeeServ.visit();
    // Track route changes:
    this.ackeeServ.visit(
      this.router.events.pipe(filter((evt) => evt instanceof NavigationEnd))
    );
  }
  triggerAction() {
    this.ackeeServ.event(
      'evnt-id-from-ackee-instance-settings-page',
      {
        key: 'your-event-key',
        value: 1,
      },
      (actionId: string) => (this.actionId = actionId)
    );
  }
  triggerActionUpdate() {
    this.ackeeServ.eventUpdate(this.actionId, {
      key: 'your-key',
      value: 42,
    });
  }
}
