import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';

const routes: Routes = [
  { path: '', redirectTo: 'todo', pathMatch: 'full' },
  { path: 'todo', component: TodosListComponent },
  { path: 'todo/:id', component: TodoDetailsComponent },
  { path: 'add', component: AddTodoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
