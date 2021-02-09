import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AckeeRecorder,
  AckeeConfig,
  AckeeInstance,
  AckeeActionAttributes,
} from './ackee.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AckeeService {
  private loaded: boolean;
  private ackeeInstance: AckeeInstance;
  private ackeeRecorder: AckeeRecorder;
  private ackeeConfig: AckeeConfig;

  constructor(private config: AckeeConfig) {
    this.ackeeConfig = this.config;
    if (!this.ackeeConfig.options) this.ackeeConfig.options = {};
  }

  public async visit(obs?: Observable<any>) {
    if (this.ackeeConfig.ignore) return;
    await this.load();
    this.track();
    if (obs) {
      obs.subscribe((_) => {
        this.track();
      });
    }
  }

  public async event(
    eventId: string,
    attributes: AckeeActionAttributes,
    callback?: (actionId: string) => void
  ): Promise<void> {
    if (this.ackeeConfig.ignore) return;
    await this.load();
    this.ackeeInstance.action(eventId, attributes, callback);
  }

  public async eventUpdate(
    actionId: string,
    attributes: AckeeActionAttributes
  ): Promise<void> {
    await this.load();
    this.ackeeInstance.updateAction(actionId, attributes);
  }

  private async load(): Promise<void> {
    if (!this.loaded) {
      await new Promise<void>((resolve, reject) => {
        const script: any = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.ackeeConfig.tracker;
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
      this.ackeeInstance = window.ackeeTracker.create(
        this.ackeeConfig.server,
        this.ackeeConfig.options
      );
      this.loaded = true;
    }
  }

  private track() {
    if (this.ackeeConfig.dev) console.log('PAGE TRACKED');
    if (this.ackeeRecorder) {
      this.ackeeRecorder.stop();
    }
    this.ackeeRecorder = this.ackeeInstance.record(this.ackeeConfig.domainId);
  }
}
