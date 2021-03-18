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
  listsURL:string = 'https://tranquil-cove-22865.herokuapp.com/lists'
 
  constructor(private http:HttpClient) { }

  addANewList(list): Observable<any> {
    return this.http.post(this.listsURL, list, httpOptions)
  }

  getLists(): Observable<any> {
    return this.http.get<any>(this.listsURL);
  }

  getTasks(id): Observable<any> {
    return this.http.get<any>(`https://tranquil-cove-22865.herokuapp.com/tasks?listsId=${id}`)
  }
  getAllTasks(): Observable<any> {
    return this.http.get<any>(`https://tranquil-cove-22865.herokuapp.com/tasks`)
  }
  addANewTask(task): Observable<any> {
    const url='https://tranquil-cove-22865.herokuapp.com/tasks'
    return this.http.post(url, task, httpOptions)
  }

  deleteATask(id): Observable<any> {
    const url=`https://tranquil-cove-22865.herokuapp.com/tasks/${id}`
    return this.http.delete(url)
  }
  deleteAList(id): Observable<any> {
    const url=`https://tranquil-cove-22865.herokuapp.com/lists/${id}`
    return this.http.delete(url)
  }
  toggleCompleted(id, updated): Observable<any> {
    const url=`https://tranquil-cove-22865.herokuapp.com/tasks/${id}`
    return this.http.put(url, updated, httpOptions)
  }
}
