import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPopComponent } from './features/form-pop/form-pop.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  {path:'form-add/:id',component:FormPopComponent},
  {path:'form-add',component:FormPopComponent},
  {path:'',component:HomeComponent},
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
