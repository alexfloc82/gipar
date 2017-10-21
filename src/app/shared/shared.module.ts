import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import {IncurridoPipe} from './incurrido.pipe';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  declarations: [IncurridoPipe ],
  exports:[IncurridoPipe]
})
export class SharedModule { }
