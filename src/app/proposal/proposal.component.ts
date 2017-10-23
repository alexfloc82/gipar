import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../core/auth/auth.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { User, Proposal, Travel } from '../shared/datamodel';
import { UtilsService } from '../core/utils/utils.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css']
})
export class ProposalComponent implements OnInit {
  loader=true;
  proposals: any[];
  closedProposals: any[];
  inprogressProposals: any[];
  filter:any;
  areas:any[];

  constructor(
    public authService: AuthService, 
    private db: AngularFireDatabase, 
    private router: Router,
    private route: ActivatedRoute,) { 
      this.filter={area:""};
      this.db.list('/areas').subscribe(areas => this.areas=areas);
      this.getProposals(); 
    }

  ngOnInit() {
  }

  getProposals(){
    
    this.db.list('/proposals').subscribe(a => {
    this.proposals = a;
    this.proposals.forEach(proposal => this.getArea(proposal));
    this.proposals.sort(this.sortById);
    this.closedProposals = this.proposals.filter(proposal => proposal.closed && (proposal.area == this.filter.area || this.filter.area==""));
    this.inprogressProposals = this.proposals.filter(proposal => !proposal.closed && (proposal.area == this.filter.area || this.filter.area==""));
    this.inprogressProposals.push({});
    this.loader=false;});
  }

  gotoDetail(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  getArea(proposal : Proposal){
    this.db.object('/areas/'+proposal.area).subscribe(area => proposal['areaName']=area.name);
  }

  sortById(p1:Proposal, p2:Proposal){
    return p1.id.toLocaleLowerCase() > p2.id.toLocaleLowerCase()? 1:-1;
  }

}
