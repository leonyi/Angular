import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-servers',
  // templateUrl: './servers.component.html',
  template: `
    <div class="panel-body">
      <h3>Task List</h3>
      <ul *ngFor="let task of tasks">
        <li style="list-style: none">
            <p style="font-weight: bold"> {{ task.title }}</p>
            <p> {{ task.description }} </p>
            <button type="button" class="btn btn-outline-danger" (click)="onDelete(task._id)">Delete</button>
            <button type="button" class="btn btn-outline-info" (click)="setEditOn()">Edit</button>
            <form *ngIf="editTask"(submit)="onEdit(task, task._id)">
              <h3>Edit a Task</h3>
              <p>Title: </p>
              <input type="text" name="task.title" [(ngModel)] = "task.title">
              <p>Description: </p>
              <input type="text" name="task.description" [(ngModel)] = "task.description">
              <input type="submit" value="Edit">
            </form>
        </li>
        <hr>
      </ul>
    </div>
  `,
  styleUrls: ['./servers.component.css']
})

export class ServersComponent implements OnInit {
  editTask = false;
  tasks = [];
  lastTask = '';
  task: any;
  tasktoEdit: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getTasksFromService();
    this.tasktoEdit = {title: `${this.task.title}`, description: `${this.task.description}`};
  }

  setEditOn() {
    this.editTask = true;
  }

  onEdit(task, _id) {
    console.log(_id);
    const observable = this._httpService.editTask(this.tasktoEdit, _id);
    observable.subscribe(data => console.log('Edited task: ', data));
  }

  onDelete(_id) {
    console.log('Deleting task: ', _id);
    const observable = this._httpService.deleteTaskbyId(_id);
   observable.subscribe(data => console.log('Deleted requested task!', data));

  }

  getTasksFromService() {
    const observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log('Got our data!', data);
      this.tasks = data['tasks'].sort();
       this.lastTask = this.tasks[this.tasks.length - 1];
    });
  }

}
iter
