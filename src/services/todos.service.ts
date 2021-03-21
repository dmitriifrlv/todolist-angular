import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { List } from '../app/Models/List'
import { Task } from '../app/Models/Task'

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
  URL = 'http://localhost:3000';  
  constructor(private http:HttpClient) { }

  addANewList(list:List): Observable<List> {
    const url = `${this.URL}/lists`
    return this.http.post<List>(url, list, httpOptions)
  }

  getLists(): Observable<[]> {
    const url = `${this.URL}/lists`
    return this.http.get<[]>(url);
  }

  getTasks(id:string): Observable<any> {
    const url = `${this.URL}/tasks?listsId=${id}`
    return this.http.get(url)
  }

  addANewTask(task:Task): Observable<Task> {
    const url = `${this.URL}/tasks`
    return this.http.post<Task>(url, task, httpOptions)
  }

  deleteATask(id:string): Observable<Task> {
    const url = `${this.URL}/tasks/${id}`
    return this.http.delete<Task>(url)
  }

  deleteAList(id:string): Observable<List> {
    const url = `${this.URL}/lists/${id}`
    return this.http.delete<List>(url)
  }

  toggleCompleted(id:string, update:Task): Observable<Task> {
    const url = `${this.URL}/tasks/${id}`
    return this.http.put<Task>(url, update, httpOptions)
  }

  listUpdate(id:string, update:List): Observable<List> {
    const url = `${this.URL}/lists/${id}`
    return this.http.put<List>(url, update, httpOptions)
  }

}
