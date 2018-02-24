import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient) {
  }

  getWeather(cityId) {
    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=imperial&appid=07a0aa8be4bbfbc009edc7f16fc93d42`;
    console.log('Weather URL: ', weatherURL);
    return this._http.get(weatherURL);

  }
}
