import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from '../company';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {
  isNewCompany: boolean;
  companyKey: string;
  company$: FirebaseObjectObservable<Company>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService) { }

  ngOnInit() {
    this.companyKey = this.activatedRoute.snapshot.params['id'];
    this.isNewCompany = this.companyKey === 'new';
    !this.isNewCompany
      ? this.getCompany()
      : this.company$ = Observable.of({}) as FirebaseObjectObservable<Company>;
  }

  getCompany() {
    this.company$ = this.companyService.getCompany(this.companyKey);
  }

  saveCompany(company) {
    const save = this.isNewCompany
      ? this.companyService.saveCompany(company)
      : this.companyService.editCompany(company);
  }

  removeCompany(company) {
    this.companyService.removeCompany(company);
  }
}
