import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo{
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ){

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {
 
  todos: Todo[]
  message: string
  // [
  //   new Todo(1, 'Learn AWS', false, new Date()),
  //   new Todo(2, 'Learn FSD', false, new Date()),
  //   new Todo(3, 'Learn No SQL', false, new Date())
  // ]
  // todo= {
  //   id: 1,
  //   description: 'Learn AWS'
  // }
  constructor(private todoService: TodoDataService, private router: Router) { }

  ngOnInit(): void {
    this.refreshTodo();
  }

  refreshTodo(){
    this.todoService.retrieveAllTodos('in28minutes').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    );
  }

  deleteTodo(id){
    this.todoService.deleteTodos('in28minutues', id).subscribe(
      response => {
        console.log(response);
        this.message=`Delete of Todo ${id} successful!`;
        this.refreshTodo();
      }
    )
  }

  updateTodo(id){
    console.log(`Update Todo with ${id}`);
    this.router.navigate(['todos', id]);
  }

  addTodo(){
    this.router.navigate(['todos', -1]);
  }

}
