import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TicketDetailFrom } from '../models/FormModels/TicketDetailForm';
import { listResponseModel } from '../models/Interface/listResponseModel';
import { ResponseModel } from '../models/Interface/ResponseModel';
import { PersonDto } from '../models/PersonDto';
import { Result } from '../models/Result/Result';
import { Ticket } from '../models/Ticket';
import { TicketDetailDto } from '../models/TicketDetailDto';
import { StorageService } from './storage.service';
import { TicketService } from './ticket.service';

@Injectable({
  providedIn: 'root',
})
export class TicketdetailService {
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private ticketService: TicketService
  ) {}

  GetTicketDetail(
    ticket: Ticket
  ): Observable<listResponseModel<TicketDetailDto>> {
    let apiUrl = environment.apiUrl + 'ticket/headerwithdetail/';
    return this.http.get<listResponseModel<TicketDetailDto>>(
      apiUrl + ticket.ticketId
    );
  }

  AddTicketDetail(
    ticketDetailForm: TicketDetailFrom,
    ticket: Ticket
  ): Observable<Result> {
    let User: PersonDto = this.storage.getStorage('user');
    ticket.ImportantId = ticketDetailForm.toImportantId;
    ticket.StatusId = ticketDetailForm.toStatusId;
    let body: TicketDetailFrom = {
      description: ticketDetailForm.description,
      sendPersonId: User.personId,
      ticketId: ticket.ticketId,
      toDepartmentId: ticketDetailForm.toDepartmentId,
      toImportantId: ticketDetailForm.toImportantId,
      toPersonId: ticketDetailForm.toPersonId,
      toStatusId: ticketDetailForm.toStatusId,
    };

    let apiUrl = environment.apiUrl + 'ticketdetail/add';
    this.ticketService.UpdateTicket(ticket);
    return this.http.post<ResponseModel>(apiUrl, body);
  }
}
