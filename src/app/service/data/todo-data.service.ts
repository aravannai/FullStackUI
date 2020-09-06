import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';
import { API_URL, TODO_JPA_API_URL } from 'src/app/app.constants';



@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: HttpClient) { }

  retrieveAllTodos(userName){
    return this.http.get<Todo[]>(`${TODO_JPA_API_URL}/users/${userName}/todos`)
  }

  deleteTodos(userName, id){
    return this.http.delete(`${TODO_JPA_API_URL}/users/${userName}/todos/${id}`)
  }

  updateTodo(userName, id, todo){
    return this.http.
          put<Todo>(`${TODO_JPA_API_URL}/users/${userName}/todos/${id}`, todo)
  }

  retrieveTodo(userName, id){
    return this.http.get<Todo>(`${TODO_JPA_API_URL}/users/${userName}/todos/${id}`)
  }

  createTodo(userName, todo){
    console.log(userName)
    return this.http.post(`${TODO_JPA_API_URL}/users/${userName}/todos`, todo)
  }
}
