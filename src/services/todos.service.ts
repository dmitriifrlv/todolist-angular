import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  lists:[]
  // URL = 'https://tranquil-cove-22865.herokuapp.com';  
  URL = 'http://localhost:3000';  
  constructor(private http:HttpClient) { }

  addANewList(list): Observable<any> {
    const url = `${this.URL}/lists`
    return this.http.post(url, list, httpOptions)
  }

  getLists(): Observable<any> {
    const url = `${this.URL}/lists`
    return this.http.get<any>(url);
  }

  getTasks(id:string): Observable<any> {
    const url = `${this.URL}/tasks?listsId=${id}`
    return this.http.get<any>(url)
  }
  getAllTasks(): Observable<any> {
    const url = `${this.URL}/tasks`
    return this.http.get<any>(url)
  }
  addANewTask(task): Observable<any> {
    const url = `${this.URL}/tasks`
    return this.http.post(url, task, httpOptions)
  }

  deleteATask(id:string): Observable<any> {
    const url = `${this.URL}/tasks/${id}`
    return this.http.delete(url)
  }

  deleteAList(id:string): Observable<any> {
    const url = `${this.URL}/lists/${id}`
    return this.http.delete(url)
  }

  toggleCompleted(id:string, updated): Observable<any> {
    const url = `${this.URL}/tasks/${id}`
    return this.http.put(url, updated, httpOptions)
  }

  listUpdate(id:string, updated): Observable<any> {
    const url = `${this.URL}/lists/${id}`
    return this.http.put(url, updated, httpOptions)
  }

}
