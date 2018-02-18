import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Constructor reserved for dependency injection to help the component setup.
export class AppComponent implements OnInit {
  title = 'Restful Tasks API';
  subtitle_h1 = 'All the tasks';
  subtitle_h2 = 'The last task';
  tasks = [];
  lastTask = '';

  constructor(private _httpService: HttpService) { }

  ngOnInit() { }

  onClickMe() {
    this.getTasksFromService();
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
