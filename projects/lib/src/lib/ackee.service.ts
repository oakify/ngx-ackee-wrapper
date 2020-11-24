import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AckeeOptions } from './ackee.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AckeeService {
  private loaded: Promise<void>;

  private ackeeOptions: AckeeOptions;

  constructor(private config: AckeeOptions) {
    this.ackeeOptions = this.config;
  }

  public async create(obs?: Observable<any>) {
    await this.load();
    this.track();
    if (obs) {
      obs.subscribe((_) => {
        this.track();
      });
    }
  }

  private load(): Promise<void> {
    if (!this.loaded) {
      this.loaded = new Promise<void>((resolve, reject) => {
        const script: any = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.ackeeOptions.tracker;
        script.onerror = (e: any) => reject(e);
        if (script.readyState) {
          script.onreadystatechange = () => {
            if (
              script.readyState === 'loaded' ||
              script.readyState === 'complete'
            ) {
              script.onreadystatechange = null;
              resolve();
            }
          };
        } else {
          script.onload = () => {
            resolve();
          };
        }
        document.getElementsByTagName('body')[0].appendChild(script);
      });
    }

    return this.loaded;
  }

  private track() {
    if (this.ackeeOptions.dev) console.log('PAGE TRACKED');

    const ops = this.ackeeOptions.options ? this.ackeeOptions.options : {};
    window.ackeeTracker
      .create(
        {
          server: this.ackeeOptions.server,
          domainId: this.ackeeOptions.domainId,
        },
        ops
      )
      .record();
  }
}
