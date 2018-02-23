import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient) {
  }

  // record here updates the author name.
  getRecords() {
    // return this._http.get('/quotes');
    return this._http.get('/quotes', {observe: 'body', responseType: 'json'});
  }

  getRecordbyId(_id) {
    return this._http.get(`/quotes/${_id}`);
  }

  addRecord(record) {
    return this._http.post('/quotes', record);

  }

  deleteRecordbyId(_id) {
    return this._http.delete(`/quotes/${_id}`);
  }

  editRecord(_id, record) {
    console.log('Record to edit: ', record);
    console.log('Record ID: : ', _id);
    return this._http.put(`/quotes/${_id}`, record);
  }

  // Requests to add quotes to records and update vote ranks.
  // record here updates the quotes list.
  addQuote(_id, record) {
    console.log('Adding quotes to quoterank record: ', record);
    return this._http.post(`/quotes/${_id}/quotes`, record);
  }

}
