import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retryWhen } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LoginForm } from '../models/FormModels/LoginForm';
import { listResponseModel } from '../models/Interface/listResponseModel';
import { PersonDto } from '../models/PersonDto';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private client: HttpClient, private storage: StorageService) {}

  ENDPOINT = environment.apiUrl;

  Login(Login: LoginForm): Observable<listResponseModel<PersonDto>> {
    return this.client.post<listResponseModel<PersonDto>>(
      this.ENDPOINT + 'auth/login',
      Login
    );
  }

  UserValid() {
    let user: PersonDto = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      return true;
    }
    return false;
  }
}
