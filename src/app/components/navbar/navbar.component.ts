import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DBOticket } from 'src/app/models/DB/DBOticket';
import { TicketService } from 'src/app/services/ticket.service';
import { AddticketmodalComponent } from '../addticketmodal/addticketmodal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private ticketService: TicketService,
    private ticketDB: DBOticket
  ) {}

  ngOnInit(): void {}

  selectedValue: any;

  OpenPerson() {
    this.ticketService.GetOpenPerson().subscribe((res) => {
      this.ticketDB.DBOTicket = res.data;
    });
  }

  LastAssignMe() {
    this.ticketService.GetLastPerson().subscribe((res) => {
      this.ticketDB.DBOTicket = res.data;
    });
  }
  openModal() {
    this.dialog.open(AddticketmodalComponent, {
      panelClass: ['col-8', 'overflow-auto'],
    });
  }
}
