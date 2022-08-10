import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTableComponent } from './home-table/home-table.component';

const routes: Routes = [
  {
    path:'',component:HomeTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
