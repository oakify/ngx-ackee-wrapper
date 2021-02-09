declare global {
  interface Window {
    ackeeTracker: AckeeTracker;
  }
}

export class AckeeConfig {
  tracker: string;
  server: string;
  domainId: string;
  options?: {
    ignoreLocalhost?: boolean;
    detailed?: boolean;
    ignoreOwnVisits?: boolean;
  };
  dev?: boolean;
  ignore?: boolean;
}

export interface AckeeTracker {
  create: (
    server: string,
    opts?: {
      ignoreLocalhost?: boolean;
      detailed?: boolean;
    }
  ) => AckeeInstance;
}

export interface AckeeInstance {
  record: (
    domainId: string,
    attributes?: AckeeAttributesObject
  ) => AckeeRecorder;
  action: (
    eventId: string,
    attributes: AckeeActionAttributes,
    callback?: (actionId: string) => void
  ) => void;
  updateAction: (actionId: string, attributes: AckeeActionAttributes) => void;
}

export interface AckeeRecorder {
  stop: Function;
}

export interface AckeeAttributesObject {
  siteLocation?: string;
  siteReferrer?: string;
}

export interface AckeeActionAttributes {
  key: string;
  value?: number;
}
