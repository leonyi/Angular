import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-washingtondc',
  templateUrl: './washingtondc.component.html',
  styleUrls: ['./washingtondc.component.css']
})
export class WashingtondcComponent implements OnInit {
  city_code = '4516446';
  humidity: number;
  tempHigh: number;
  tempLow: number;
  tempAverage: number;
  status: string;
  weatherData: any;

  constructor( private _httpService: HttpService) { }

  ngOnInit() {
    this.getLocalWeather();
  }

  getLocalWeather() {
    const observable = this._httpService.getWeather(this.city_code);
    observable.subscribe(data => {
      console.log(`Weather data for ${this.city_code} (Washignton, DC): `, data);
      this.weatherData = data;
      this.humidity = this.weatherData.main.humidity;
      this.tempHigh = this.weatherData.main.temp_max;
      this.tempLow = this.weatherData.main.temp_min;
      this.tempAverage = Math.round((this.tempHigh + this.tempLow) / 2);
      this.status = this.weatherData.weather[0].description;
    });
  }
}
