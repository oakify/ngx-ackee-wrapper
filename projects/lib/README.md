# Angular Ackee Wrapper

This is an Angular wrapper library for [ackee-tracker](https://github.com/electerious/ackee-tracker), the client-side piece of [Ackee](https://ackee.electerious.com/) analytics.

_This version is now (ONLY) compatible with Ackee v3, including event tracking! See [Release Notes for v3](https://github.com/electerious/Ackee/releases/tag/v3.0.0)_

> 🚨 BREAKING CHANGES: the `.create()` method was renamed to `.visit()` for better naming consistency with `.event()` - one tracks a **_visit_** and the other an **_event_**. Both **_create_** the instance if it does not exist. Also, the interface `AckeeOptions` has been renamed `AckeeConfig`.

Please make sure you read Ackee's [docs](https://docs.ackee.electerious.com/) before you use this lib.

For more insights on how this wrapper works, you can clone its [repository](https://github.com/oakify/ngx-ackee-wrapper) which contains a test app.

> ⚠️ _There are 2 ways to get ackee-tracker: from your Ackee instance (i.e: https://yourackeeinstance.com/**tracker.js**) or from npm. This library only supports getting it from your instance, which is the way that is reccomended by the Ackee devs._

## 1. Installing the library ⚙️

### 1.1. Download & add to your project

```shell
$ npm install ngx-ackee-wrapper
```

Or

```shell
$ yarn add ngx-ackee-wrapper
```

### 1.2. Update your AppModule

```typescript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

import { AckeeModule, AckeeOptions } from "ngx-ackee-wrapper"; // <-- 1. ADD THIS

// 2. Configure to your Ackee instance:
const ACKEE_CONFIG: AckeeOptions = {
  tracker: "https://yourackeeinstance.com/tracker.js",
  server: "https://yourackeeinstance.com",
  domainId: "12312311-1234-1234-1234-123412341234",
  options: {
    // ignoreLocalhost: false,
    // detailed: true,
    // ignoreOwnVisits: true,
  },
  dev: true,
  ignore: false,
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AckeeModule.forRoot(ACKEE_CONFIG)], // <-- 3. Add AckeeModule & config to imports
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Configuration:

- **tracker: (string)** The full url to your instance's tracker (you can configure a custom name other than tracker.js). See [here](https://github.com/electerious/ackee-tracker#-installation).

- **server (string), domainId (string) & options (object):** same as in ackee-tracker, see the [docs](https://github.com/electerious/ackee-tracker#createserver-opts).

- **dev (boolean):** optional, will add a message to console log - just a check to see if it runs
- **ignore (boolean):** optional, will completely ignore Ackee: useful in dev when you don't want to run a local instance (or point to the prod) while working on something else - using environment variables for this is recommended (see demo app)

> Note: You can also use environment variables as demonstrated in the demo app.

## 2. Using the Library 🚀

### 2.1. Track visits

In your Component:

```typescript
import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { AckeeService } from "projects/lib/src/public-api";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(private ackeeServ: AckeeService, private router: Router) {
    // Don't track route changes:
    // this.ackeeServ.visit();

    // Track route changes:
    this.ackeeServ.visit(
      this.router.events.pipe(filter((evt) => evt instanceof NavigationEnd))
    );
  }
}
```

To track route changes, we get the router's events (an `Observable<Event>`) and we filter them to get only the events of type NavigationEnd. If you want, you can use NavigationStart instead. In fact you can pass any Observable you want to get fancy with the tracking. I personally prefer NavigationEnd so that I only track the pages that have effectively loaded.

If you don't want to track route changes, just don't pass anything in `.visit()`:

```typescript
this.ackeeServ.visit();
```

_This will result in only one page or visit recorded for your entire Angular app, no mater how many routes were opened (unless the user reloads the page). The upside of this option however, is that the recorded "duration" of the visit will be for the entire session of the use of the app._

### 2.2. Track events: `.event()`

You can track any event you want. Please read the docs to understand how that translates to the Ackee reporting.

For example, to track a click on a button, in your HTML Template:

```HTML
<button (click)="triggerAction()">Click for Event</button>
```

In your Component:

```typescript
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
```

Parameters:

- `eventId` `(string)`: get it from you Ackee's instance settings page;
- `attributes` `({key:string; value:number})`: record whatever you want;
- `callback` (optional): will receive the `actionId (string)` that lets you update your event later, if required.

### 2.2. Update events `.eventUpdate()`

You can change the attibutes of any past event as long as you have its `actionId` that you get from the callback in `.event()`.

In your Component:

```typescript
this.ackeeServ.eventUpdate("the-action-id-from-event-method", {
  key: "your-key",
  value: 42,
});
```

Parameters:

- `actionId` `(string)`: get it from the callback in `.event()` - see above;
- `attributes` `({key:string; value:number})`: update the record with whatever you want;

## 3. Miscellaneous 🦦

### 3.1 License

MIT - Software is provided as is, no liability to the developer.

### 3.2 Donate to the Ackee developer (not me)

Please consider donating to the developer of Ackee to keep this amazing project going. They are working hard, continuously developing and maintaining Ackee as a free, self hosted, privacy-first analytics solution.

- [Become a GitHub sponsor of the Ackee dev](https://github.com/sponsors/electerious)
- [Donate via PayPal to the Ackee dev](https://paypal.me/electerious)
- [Buy the Ackee dev a coffee](https://www.buymeacoffee.com/electerious)

### 3.3 Links

- [Ackee Official](https://ackee.electerious.com/)
- [Follow Ackee on Twitter](https://twitter.com/getackee)
- [Vote for Ackee on ProductHunt](https://www.producthunt.com/posts/ackee)
