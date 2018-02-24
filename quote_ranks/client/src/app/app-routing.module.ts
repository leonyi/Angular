import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuoteranksComponent } from './quoteranks/quoteranks.component';
import { AuthorComponent } from './author/author.component';
import { QuoteComponent } from './quote/quote.component';
import { EditauthorComponent } from './editauthor/editauthor.component';
import { QuotelistComponent } from './quotelist/quotelist.component';

const routes: Routes = [
  {path: 'quoteranks', component: QuoteranksComponent},
  {path: 'quote', component: QuoteComponent},
  {path: 'quote/:id', component: QuoteComponent},
  {path: 'author', component: AuthorComponent},
  {path: 'editauthor/:id', component: EditauthorComponent},
  {path: 'quotelist', component: QuotelistComponent},
  {path: 'quotelist/:id', component: QuotelistComponent},
  {path: '', pathMatch: 'full', redirectTo: '/quoteranks' }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    // { enableTracing: true } // Debugging purposes only!
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
