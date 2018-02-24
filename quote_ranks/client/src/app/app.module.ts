import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { QuoteranksComponent } from './quoteranks/quoteranks.component';
import { AuthorComponent } from './author/author.component';
import { QuoteComponent } from './quote/quote.component';
import { QuotelistComponent } from './quotelist/quotelist.component';
import { EditquoteComponent } from './editquote/editquote.component';
import { EditauthorComponent } from './editauthor/editauthor.component';

// Decorator
@NgModule({
  declarations: [
    AppComponent,
    QuoteranksComponent,
    AuthorComponent,
    QuoteComponent,
    QuotelistComponent,
    EditquoteComponent,
    EditauthorComponent
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
