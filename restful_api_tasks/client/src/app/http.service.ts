import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient) {
    // this.getTasks();
    // this.getTaskbyId();
    // this.deleteTaskbyId();
    // this.getPokemon();
  }

  getTasks() {
    // Our http response is an Observable, return it so the app.component,
    // can receive it and subscribe to it to get the data it needs from this
    // http request.
    return this._http.get('/api/tasks');
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    // tempObservable.subscribe(data => console.log('Got our tasks!', data));
  }

  // getTaskbyId() {
  //   const tempObservable = this._http.get('/api/tasks/5a85103b1ed01d08f162c22d');
  //   tempObservable.subscribe(data => console.log('Got info for requested task: ', data));
  // }

  // deleteTaskbyId() {
  //   const tempObservable = this._http.delete('/api/tasks/5a8668a66a869f53fa19a1da');
  //   tempObservable.subscribe(data => console.log('Deleted requested task!', data));
  // }

  // getPokemon() {
  //   const bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
  //   bulbasaur.subscribe(data => console.log('Got bulbasaur from pokeapi: ', data));
  // }

}
