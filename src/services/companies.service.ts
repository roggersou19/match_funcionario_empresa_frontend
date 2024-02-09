import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Company } from './../models/company';
import { environment } from '../environments/environment';
import { Knowledge } from '../models/knowledge';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private url = environment.baseUrl + '/companies';

  constructor(private http: HttpClient) { }

  create(company: Company) {
    return this.http.post<Company>(this.url, company);
  }

  get(id: number) {
    return this.http.get<Company>(this.url + '/' + id);
  }

  getAll() {
    return this.http.get<[Company]>(this.url);
  }

  update(company: Company) {
    return this.http.put<Company>(this.url + '/' + company.id, company);
  }

  delete(company: Company) {
    return this.http.delete<Company>(this.url + '/' + company.id);
  }

  getKnowledge(company: Company){
    return this.http.get<Company>(this.url + '/' + company.id +  "/knowledge/");
  }
  
 
}
