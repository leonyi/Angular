
import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-petdetails',
  templateUrl: './petdetails.component.html',
  styleUrls: ['./petdetails.component.css']
})
export class PetdetailsComponent implements OnInit {
  skills = [];
  pet: any;
  pet_name: string;
  pet_type: string;
  pet_description: string;
  pet_likes: number;

  params: any;

  constructor(
    private _httpService: HttpService,
    private route: ActivatedRoute,
    private router: Router

  ) { this.route.params.subscribe( params => this.params = params ); }

  ngOnInit() {
    this.getPets();
  }

  getPets() {
    console.log('Getting pet details with record ID: ', this.params.id);
    const observable = this._httpService.getRecordbyId(this.params.id);
    observable.subscribe(data => {
      console.log('GET request for record sent got this response: ', data);
      this.pet = data[0];
      this.skills = this.pet.skills;
      this.pet_name = this.pet.name;
      this.pet_type = this.pet.type;
      this.pet_description = this.pet.description;
      this.pet_likes = this.pet.likes;
    });
  }

  deletePet(id) {
    console.log('Removing requested record: ', id);
    const observable = this._httpService.deleteRecordbyId(id);
    observable.subscribe(
      data => {
        console.log('Sent request to remove record and recieved response: ', data);
        this.goHome();
      },
      error => {
        console.log('Error processing request to remove author: ', error);
      }
    );
  }

  // Come back to this!
  likePet(id) {
    console.log('Increasing likes for pet: ', id);
    const observable = this._httpService.upLikes(id, this.pet);
    observable.subscribe(
      data => {
        console.log('Request to up vote for quote sent and received: ', data);
        this.getPets();
      },
      error => {
        // Error handling here
        console.log('Error processing your request to upvote!');
      }
    );
  }

  goHome() {
    this.router.navigate(['/listpets/']);

  }

}
