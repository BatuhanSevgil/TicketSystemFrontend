import { NgModule } from '@angular/core';
import { RouterModule, Routes, ParamMap } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ToworksComponent } from './components/main/component/toworks/toworks.component';
import { WorksComponent } from './components/main/component/works/works.component';
import { MainComponent } from './components/main/main.component';
import { LoginGuard } from './interceptor/login.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    pathMatch: 'full',
  },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'main',
    canActivate: [LoginGuard],
    component: MainComponent,
    children: [
      { path: '', component: WorksComponent },
      { path: 'works', component: WorksComponent },
      { path: 'toworks', component: ToworksComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
