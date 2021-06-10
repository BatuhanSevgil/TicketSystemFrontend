import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Departments } from '../models/EventModel/Department';
import { Important } from '../models/EventModel/Important';
import { PersonName } from '../models/EventModel/PersonName';
import { Status } from '../models/EventModel/Status';
import { listResponseModel } from '../models/Interface/listResponseModel';

@Injectable({
  providedIn: 'root',
})
export class TicketEventService {
  constructor(private httpClient: HttpClient) {}

  GetAllImporantDetail(): Observable<listResponseModel<Important>> {
    let apiUrl = environment.apiUrl + 'Important';
    return this.httpClient.get<listResponseModel<Important>>(apiUrl);
  }

  GetAllStatusDetail(): Observable<listResponseModel<Status>> {
    let apiUrl = environment.apiUrl + 'status';
    return this.httpClient.get<listResponseModel<Status>>(apiUrl);
  }

  GetAllDepartmentDetail(): Observable<listResponseModel<Departments>> {
    let apiUrl = environment.apiUrl + 'department';
    return this.httpClient.get<listResponseModel<Departments>>(apiUrl);
  }

  GetAllPersonRealName(): Observable<listResponseModel<PersonName>> {
    let apiUrl = environment.apiUrl + 'person';
    return this.httpClient.get<listResponseModel<PersonName>>(apiUrl);
  }
}
