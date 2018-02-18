import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-key-up',
  // templateUrl: './app-key-up.component.html',
  template: `
    <input #box placeholder="Enter a task id"
      (keyup.enter)="onclick(box.value)"
      (blur)="onclick(box.value)">
      <p *ngIf="value"> {{value}}!</p>
      <p *ngIf="task_name">{{ task_name}} - {{task_description}}</p>
  `,
  styleUrls: ['./app-key-up.component.css']
})

export class AppKeyUpComponent implements OnInit {
  value = '';
  tasks = [];
  task_name = '';
  task_description = '';

  // Subscribe to the httpService.
  constructor(private _httpService: HttpService) { }
  ngOnInit() { }

  onclick(value: string) {
    this.getTaskbyId(value);
  }

  getTaskbyId(taskId: string) {
    const observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log('Got data requested by app-key-up: ', data);
      this.tasks = data['tasks'];
      console.log('Searching for task: ', taskId);
      for ( const task of this.tasks ) {
        if ( task._id === taskId ) {
          this.task_name = task.title;
          this.task_description = task.description;
          this.value = 'Found ' + taskId;
        }
     }
     if (!this.value) { this.value = 'Not Foud!'; }
    });

  }
}
