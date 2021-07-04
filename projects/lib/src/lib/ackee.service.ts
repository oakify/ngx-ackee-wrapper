import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AckeeRecorder,
  AckeeConfig,
  AckeeInstance,
  AckeeActionAttributes,
  AckeeAttributesObject
} from './ackee.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AckeeService {
  private loaded: boolean;
  private ackeeInstance: AckeeInstance;
  private ackeeRecorder: AckeeRecorder;
  private ackeeConfig: AckeeConfig;
  private ackeeAttributes: AckeeAttributesObject;

  constructor(private config: AckeeConfig) {
    this.ackeeConfig = this.config;
    if (!this.ackeeConfig.options) this.ackeeConfig.options = {};
  }

  public async visit(obs?: Observable<any>, attributes?: AckeeAttributesObject) {
    if (this.ackeeConfig.ignore) return;
    await this.load();

    if (!attributes)
      attributes = this.ackeeAttributes;

    this.track(attributes);
    if (obs) {
      obs.subscribe((_) => {
        this.track(attributes);
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
      this.ackeeAttributes = window.ackeeTracker.attributes(this.ackeeConfig.options.detailed ?? false);
      this.loaded = true;
    }
  }

  public async attributes(): Promise<AckeeAttributesObject> {
    await this.load();
    return this.ackeeAttributes;
  }

  private track(attributes: AckeeAttributesObject) {
    if (this.ackeeConfig.dev) console.log('PAGE TRACKED');
    if (this.ackeeRecorder) {
      this.ackeeRecorder.stop();
    }
    this.ackeeRecorder = this.ackeeInstance.record(this.ackeeConfig.domainId, attributes);
  }
}
