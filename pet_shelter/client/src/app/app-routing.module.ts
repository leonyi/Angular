import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListpetsComponent } from './listpets/listpets.component';
import { AddpetComponent } from './addpet/addpet.component';
import { EditpetComponent } from './editpet/editpet.component';
import { PetdetailsComponent } from './petdetails/petdetails.component';


const routes: Routes = [
  {path: 'listpets', component: ListpetsComponent},
  {path: 'addpet', component: AddpetComponent},
  {path: 'petdetails', component: PetdetailsComponent},
  {path: 'petdetails/:id', component: PetdetailsComponent},
  {path: 'editpet', component: EditpetComponent},
  {path: 'editpet/:id', component: EditpetComponent},
  {path: '', pathMatch: 'full', redirectTo: '/listpets' }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
    // { enableTracing: true } // Debugging purposes only!
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
