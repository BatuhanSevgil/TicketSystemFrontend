import { Injectable } from '@angular/core';
import { Ticket } from '../Ticket';

@Injectable({ providedIn: 'root' })
export class DBOticket {
  constructor() {}

  DBOTicket: Ticket[] = [];

  public get GetDB(): Ticket[] {
    return this.DBOTicket;
  }

  public set SetDB(v: Ticket[]) {
    this.DBOTicket = v;
  }
}
