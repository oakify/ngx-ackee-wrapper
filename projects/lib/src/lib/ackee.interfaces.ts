declare global {
  interface Window {
    ackeeTracker: AckeeTracker;
  }
}

export class AckeeOptions {
  tracker: string;
  server: string;
  domainId: string;
  options?: {
    ignoreLocalhost?: boolean;
    detailed?: boolean;
    ignoreOwnVisits?: boolean;
  };
  dev?: boolean;
}

export interface AckeeTracker {
  create: (
    serv: { server: string; domainId: string },
    opts?: {
      ignoreLocalhost?: boolean;
      detailed?: boolean;
    }
  ) => AckeeObject;
}

export interface AckeeObject {
  record: Function;
}
