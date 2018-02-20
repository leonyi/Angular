import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient) {
  }

  getTasks() {
    // Our http response is an Observable, return it so the app.component,
    // can receive it and subscribe to it to get the data it needs from this
    // http request.
    // return this._http.get('/api/tasks');
    return this._http.get('/api/tasks', {observe: 'body', responseType: 'json'});
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    // tempObservable.subscribe(data => console.log('Got our tasks!', data));
  }

  getTaskbyId(_id) {
    return this._http.get(`/api/tasks/${_id}`);
  }

  storeTask(task) {
    // This returs the observable.  It doesn't make a request until we subscribe.
    return this._http.post('/api/tasks', task);

  }

  deleteTaskbyId(_id) {
    return this._http.delete(`/api/tasks/${_id}`);
  }

  editTask(task, _id) {
    console.log('Task received to edit: ', task);
    console.log('Task ID: : ', _id);
    return this._http.put(`/api/tasks/${_id}`, task);
  }

}
