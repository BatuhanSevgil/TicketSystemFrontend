import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { newTicket } from '../models/FormModels/newTicket';
import { listResponseModel } from '../models/Interface/listResponseModel';
import { ResponseModel } from '../models/Interface/ResponseModel';
import { PersonDto } from '../models/PersonDto';
import { Result } from '../models/Result/Result';
import { Ticket } from '../models/Ticket';
import { TicketFilter } from '../models/TicketFilter';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private client: HttpClient, private _storage: StorageService) {}

  //#region GET req
  GetOpenPerson(): Observable<listResponseModel<Ticket>> {
    let user: PersonDto = this._storage.getStorage('user');
    return this.client.get<listResponseModel<Ticket>>(
      environment.apiUrl + 'ticket/openperson/' + user.personId
    );
  }

  GetLastPerson(): Observable<listResponseModel<Ticket>> {
    let user: PersonDto = this._storage.getStorage('user');
    return this.client.get<listResponseModel<Ticket>>(
      environment.apiUrl + 'ticket/lastperson/' + user.personId
    );
  }

  GetTicketDetail(filter: TicketFilter): Observable<listResponseModel<Ticket>> {
    let user: PersonDto = this._storage.getStorage('user');
    return this.client.get<listResponseModel<Ticket>>(
      environment.apiUrl + 'ticket/lastperson/'
    );
  }

  GetTicketDepartment(Id: Number): Observable<listResponseModel<Ticket>> {
    let apiUrl = environment.apiUrl + 'ticket/filterdepartment/' + Id;
    return this.client.get<listResponseModel<Ticket>>(apiUrl);
  }

  //#endregion

  //#region POST
  NewTicket(ticket: newTicket): Observable<Result> {
    let user: PersonDto = this._storage.getStorage('user');
    ticket.openPersonId = user.personId;
    let apiUrl = environment.apiUrl + 'ticket/addwithdetail';
    return this.client.post<Result>(apiUrl, ticket);
  }

  GetFilter(ticket: TicketFilter): Observable<listResponseModel<Ticket>> {
    let apiUrl = environment.apiUrl + 'ticket/filter';
    return this.client.post<listResponseModel<Ticket>>(apiUrl, ticket);
  }

  //#endregion

  UpdateTicket(ticket: Ticket) {
    let apiUrl = environment.apiUrl + 'ticket/update';
    return this.client.put<ResponseModel>(apiUrl, ticket).subscribe();
  }
}
