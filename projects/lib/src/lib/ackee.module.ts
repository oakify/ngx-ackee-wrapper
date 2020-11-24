import { ModuleWithProviders, NgModule } from '@angular/core';
import { AckeeOptions } from './ackee.interfaces';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
})
export class AckeeModule {
  static forRoot(
    libConfiguration: AckeeOptions
  ): ModuleWithProviders<AckeeModule> {
    return {
      ngModule: AckeeModule,
      providers: [
        {
          provide: AckeeOptions,
          useValue: libConfiguration,
        },
      ],
    };
  }
}
