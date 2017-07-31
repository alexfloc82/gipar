import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class Proposal {
	area: Area[];
	estimates: Estimate[];
	end: string;
	endDate: NgbDateStruct;
	id: string;
	country: string;
	pms: any[];
	responsible: string;
	start: string;
	startDate: NgbDateStruct;
	travels: number;
	workload: number;
	closed: boolean;
	title: string;
	comments: string;

	constructor(
		date?: string,
		ngbDate?: NgbDateStruct,
	) { 
		this.start = date;
		this.end = date;
		this.startDate = ngbDate;
		this.endDate = ngbDate;
		this.estimates=[];
	}
}

export class Estimate {
	user: string;
	hours: number;

	constructor() { }
}

export class Timesheet {
	id: string;
	user: string;
	propuesta: string;
	pm: string;
	year: string;
	month: string;
	q1: number;
	q2: number;

	constructor() { }
}

export class Travel {
	id: string;
	user: string;
	start: string;
	finish: string;
	startDate: NgbDateStruct;
	finishDate: NgbDateStruct;
	expenses: number;
	proposal: string;

	constructor(
		date?: string,
		ngbDate?: NgbDateStruct,

	) {
		this.proposal = '';
		this.user= '';
		this.start = date;
		this.finish = date;
		this.startDate = ngbDate;
		this.finishDate = ngbDate;
	}
}

export class Holidays {
	id: string;
	user: string;
	from: Date;
	to: Date;

	constructor() { }
}

export class User {

	uid: string;
	adsuser: string;
	name: string;
	email: string;
	lastname: string;
	area: string;
	role: string;

	constructor() { }
}

export class Area {
	area: string;
	responsible: string;
	projectLead: string;

	constructor() { }
}
