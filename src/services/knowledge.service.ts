import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { Knowledge } from '../models/knowledge';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {

  private url = environment.baseUrl + '/knowledge';

  constructor(private http: HttpClient) { }

  create(knowledge: Knowledge) {
    return this.http.post<Knowledge>(this.url, knowledge);
  }

  get(id: number) {
    return this.http.get<Knowledge>(this.url + '/' + id);
  }

  getAll() {
    return this.http.get<[Knowledge]>(this.url);
  }

  update(knowledge: Knowledge) {
    return this.http.put<Knowledge>(this.url + '/' + knowledge.id, knowledge);
  }

  delete(knowledge: Knowledge) {
    return this.http.delete<Knowledge>(this.url + '/' + knowledge.id);
  }

  /* getKnowledge(knowledge: Knowledge){
    return this.http.get<Knowledge>(this.url + '/' + knowledge.id +  "/knowledge/");
  } */
  
 
}
