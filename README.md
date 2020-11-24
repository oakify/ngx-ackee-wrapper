# Angular Ackee Wrapper

This is an Angular wrapper library for [Ackee](https://ackee.electerious.com/).
Please make sure you have a working Ackee server (self-hosted) before you use this lib.
Also, please read Ackee's [docs](https://docs.ackee.electerious.com/).

## I. Install in your Angular App

### I.a) With NPM

```shell
$ npm install ngx-ackee-wrapper
```

### I.b) Or Yarn

```shell
$ yarn add ngx-ackee-wrapper
```

## II. Update your AppModule

```typescript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

import { AckeeModule, AckeeOptions } from "ngx-ackee-wrapper"; // <-- HERE

// configure your ackee client with (see chapter III. for more info)
const ACKEE_CONFIG: AckeeOptions = {
  tracker: "https://example.com/tracker.js",
  server: "https://example.com",
  domainId: "12312311-1234-1234-1234-123412341234",
  options: {
    // ignoreLocalhost: false,
    // detailed: true,
    // ignoreOwnVisits: true,
  },
  dev: true, // Will add to log - useful in dev if you chose ignoreLocalhost: false
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AckeeModule.forRoot(ACKEE_CONFIG)], // <-- add AckeeModule & config
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## III. Options

- **tracker:** The url to your instance's tracker (you could have a custom name) - it is recommended by Ackee's developer to use the tracker from your instance instead of the package ackee-tracker. See [here](https://github.com/electerious/ackee-tracker#-installation).

- **server, domainId & options:** same as ackee-tracker, see their [docs](https://github.com/electerious/ackee-tracker#createserver-opts).

- **dev:** optional, useful if you want to see check tracking from your console when using `ignoreLocalhost: false`

## IV. TRACK

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
    // Don't track route changes (not sure why you wouldn't want to, but you have the option)
    // this.ackeeServ.create();

    // Track route changes (recommended)
    this.ackeeServ.create(
      this.router.events.pipe(filter((evt) => evt instanceof NavigationEnd))
    );
  }
}
```

To track route changes, we get the router's events (an `Observable<Event>`) and we filter them to get only NavigationEnd types of events. If you want you can use NavigationStart instead.
I personally prefer NavigationEnd so that we track only pages that have effectively loaded.
