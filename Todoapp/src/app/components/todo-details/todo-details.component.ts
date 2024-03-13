import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
})
export class TodoDetailsComponent {
  @Input() viewMode = false;

  @Input() currentTodo: Todo = {
    title: '',
    description: '',
    mark: false
  };

  message = '';

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTodo(this.route.snapshot.params['id']);
    }
  }

  getTodo(id: string): void {
    this.todoService.get(id).subscribe({
      next: (data) => {
        this.currentTodo = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTodo.title,
      description: this.currentTodo.description,
      mark: status
    };

    this.message = '';

    this.todoService.update(this.currentTodo.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentTodo.mark = status;
        this.message = res.message
          ? res.message
          : 'The status was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }

  updateTodo(): void {
    this.message = '';

    this.todoService
      .update(this.currentTodo.id, this.currentTodo)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This todo was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteTodo(): void {
    this.todoService.delete(this.currentTodo.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/todos']);
      },
      error: (e) => console.error(e)
    });
  }
}
