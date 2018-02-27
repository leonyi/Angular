import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListpetsComponent } from './listpets/listpets.component';
import { AddpetComponent } from './addpet/addpet.component';
import { PetdetailsComponent } from './petdetails/petdetails.component';
import { EditpetComponent } from './editpet/editpet.component';
import { SkillsComponent } from './skills/skills.component';

// Decorator
@NgModule({
  declarations: [
    AppComponent,
    ListpetsComponent,
    AddpetComponent,
    PetdetailsComponent,
    EditpetComponent,
    SkillsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
