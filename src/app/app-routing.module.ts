import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { WorkDetailComponent } from './work/work-detail/work-detail.component';
import { WorkComponent } from './work/work.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'work',
    component: WorkComponent,
    children: [{ path: '', component: WorkDetailComponent }, { path: ':id', component: WorkDetailComponent }]
  }
  , { path: '**', redirectTo: 'home' },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
