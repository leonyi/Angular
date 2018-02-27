import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient) {
  }

  // record here updates the author name.
  getRecords() {
    // return this._http.get('/pets');
    return this._http.get('/pets', {observe: 'body', responseType: 'json'});
  }

  getRecordbyId(_id) {
    return this._http.get(`/pets/${_id}`);
  }

  addRecord(record) {
    return this._http.post('/pets', record);
  }

  deleteRecordbyId(_id) {
    return this._http.delete(`/pets/${_id}`);
  }

  editRecord(record) {
    console.log('Record to edit: ', record);
    return this._http.put(`/pets/${record._id}`, record);
  }

  upLikes(_id, record) {
    console.log('upLikes service: upping the like for pet: ', _id);
    return this._http.put(`/pets/${_id}/up`, record);
  }

}
