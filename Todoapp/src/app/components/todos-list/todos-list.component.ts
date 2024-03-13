import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css'],
})
export class TodosListComponent {
  todos?: Todo[];
  currentTodo: Todo = {};
  currentIndex = -1;
  title = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.retrieveTodos();
  }

  retrieveTodos(): void {
    this.todoService.getAll().subscribe({
      next: (data) => {
        this.todos = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveTodos();
    this.currentTodo = {};
    this.currentIndex = -1;
  }

  setActiveTodo(todo: Todo, index: number): void {
    this.currentTodo = todo;
    this.currentIndex = index;
  }

  removeAllTodos(): void {
    this.todoService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchTitle(): void {
    this.currentTodo = {};
    this.currentIndex = -1;

    this.todoService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.todos = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
