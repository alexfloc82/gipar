import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CoreModule} from '../core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProposalRoutingModule } from './proposal-routing.module';
import { ProposalComponent } from './proposal.component';
import { ProposalService } from './proposal.service';
import { ProposalDetailComponent } from './proposal-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ProposalRoutingModule, FormsModule, NgbModule.forRoot()
  ],
  declarations: [ProposalComponent, ProposalDetailComponent],
  providers: [ProposalService]
})
export class ProposalModule { }
