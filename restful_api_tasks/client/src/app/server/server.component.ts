import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
    selector: 'app-server',
    // templateUrl: './server.component.html'
    template: `
    <h2>New Task</h2>
    <form (submit)="onSubmit()">
          <p>Title: </p>
          <input type="text" name="newTask.title" [(ngModel)]="newTask.title">
          <p>Description: </p>
          <input type="text" name="newTask.description" [(ngModel)]="newTask.description">
          <input type="submit" value="Create">
    </form>
    `
})
export class ServerComponent implements OnInit {
    newTask: any;

    constructor(private _httpService: HttpService) { }

    ngOnInit() {
        // this.newTask = {title: '', description: ''};
        this.newTask = { };
    }

    onSubmit() {
        const observable = this._httpService.storeTask(this.newTask);
        observable.subscribe(data => {
            console.log('Received new data to post: ', data);
            // Clears the title and description fields after creation because we are using
            // two way binding with [(ngModel)].
            this.newTask = {title: '', description: ''};
        });
    }

}
