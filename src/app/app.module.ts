import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ToastrModule } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';

import { MatTableModule } from '@angular/material/table';

import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NavbarComponent } from './components/navbar/navbar.component';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { MatInputModule } from '@angular/material/input';

// import { TicketdetailComponent } from './components/ticketdetail/ticketdetail.component';
// import { AddticketmodalComponent } from './components/addticketmodal/addticketmodal.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
// import { WorksComponent } from './components/main/component/works/works.component';

import { ApiErrorInterceptor } from './interceptor/api-error.interceptor';
// import { MainComponent } from './components/main/main.component';
import { LoginGuard } from './interceptor/login.guard';
// import { ToworksComponent } from './components/main/component/toworks/toworks.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    // NavbarComponent,
    // WorksComponent,
    // TicketdetailComponent,
    // AddticketmodalComponent,
    LoginPageComponent,
    // MainComponent,
    // ToworksComponent,
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatListModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
    }),
    CdkTableModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    MatSidenavModule,

    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      // registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true },
    LoginGuard,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
