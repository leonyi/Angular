import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seattle-component',
  templateUrl: './seattle.component.html',
  styleUrls: ['./seattle.component.css']
})
export class SeattleComponent implements OnInit {
  city_code = '5809844';
  humidity: number;
  tempHigh: number;
  tempLow: number;
  tempAverage: number;
  status: string;
  weatherData: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getLocalWeather();
  }

  getLocalWeather() {
    const observable = this._httpService.getWeather(5809844);
    observable.subscribe(data => {
      console.log(`Weather data for ${this.city_code} (Seattle): `, data);
      this.weatherData = data;
      this.humidity = this.weatherData.main.humidity;
      this.tempHigh = this.weatherData.main.temp_max;
      this.tempLow = this.weatherData.main.temp_min;
      this.tempAverage = Math.round((this.tempHigh + this.tempLow) / 2);
      this.status = this.weatherData.weather[0].description;
    });

  }
}
