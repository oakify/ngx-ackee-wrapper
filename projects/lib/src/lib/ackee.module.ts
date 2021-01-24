import { ModuleWithProviders, NgModule } from '@angular/core';
import { AckeeConfig } from './ackee.interfaces';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
})
export class AckeeModule {
  static forRoot(
    libConfiguration: AckeeConfig
  ): ModuleWithProviders<AckeeModule> {
    return {
      ngModule: AckeeModule,
      providers: [
        {
          provide: AckeeConfig,
          useValue: libConfiguration,
        },
      ],
    };
  }
}
