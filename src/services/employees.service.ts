import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Employee } from './../models/employee';
import { environment } from '../environments/environment';
import { Knowledge } from '../models/knowledge';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = environment.baseUrl + '/employees';

  constructor(private http: HttpClient) { }

  create(employee: Employee) {
    return this.http.post<Employee>(this.url, employee);
  }

  get(id: number) {
    return this.http.get<Employee>(this.url + '/' + id);
  }

  getAll() {
    return this.http.get<[Employee]>(this.url);
  }

  update(employee: Employee) {
    return this.http.put<Employee>(this.url + '/' + employee.id, employee);
  }

  delete(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  getKnowledge(id: number){
    return this.http.get(this.url + '/' + id +  "/knowledge/");
  }

  addKnowledge(employeeID: number, knowledgeID: number){
    console.log(this.url + '/' + employeeID +  "/knowledge/" + knowledgeID)
    return this.http.post(this.url + '/' + employeeID +  "/knowledge/" + knowledgeID, null);
  }

  deleteKnowledge(id: number, knowledgeID: number){
    return this.http.delete(this.url + '/' + id +  "/knowledge/" + knowledgeID);
  }

  getMatchingCompanySkills(id:number){

    return this.http.get(this.url + '/' + id +  "/match/");
  }
  
 
}
