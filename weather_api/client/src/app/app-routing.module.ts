import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeattleComponent} from './seattle/seattle.component';
import { SanJoseComponent } from './san-jose/san-jose.component';
import { BurbankComponent } from './burbank/burbank.component';
import { DallasComponent } from './dallas/dallas.component';
import { WashingtondcComponent } from './washingtondc/washingtondc.component';
import { ChicagoComponent } from './chicago/chicago.component';

const routes: Routes = [
  {path: 'burbank', component: BurbankComponent},
  {path: 'chicago', component: ChicagoComponent},
  {path: 'dallas', component: DallasComponent},
  {path: 'san-jose', component: SanJoseComponent},
  {path: 'seattle', component: SeattleComponent},
  {path: 'washingtondc', component: WashingtondcComponent},
  {path: '', pathMatch: 'full', redirectTo: '/san-jose' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
