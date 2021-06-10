import { Component, OnInit } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { TicketdetailComponent } from 'src/app/components/ticketdetail/ticketdetail.component';
import { Ticket } from 'src/app/models/Ticket';
import { TicketFilter } from 'src/app/models/TicketFilter';
import { TicketService } from 'src/app/services/ticket.service';
import { TicketdetailService } from 'src/app/services/ticketdetail.service';

@Component({
  selector: 'app-toworks',
  templateUrl: './toworks.component.html',
  styleUrls: ['./toworks.component.scss'],
})
export class ToworksComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private ticketservice: TicketService,
    private ticketDetail: TicketdetailService
  ) {}
  dialogs: DialogPosition;
  filterText: string;

  Tickets: Ticket[];
  colms: string[] = [
    'Abone No',
    'Oluşturan Personel',
    'Son Atanan',
    'Durum',
    'Önem Düzeyi',
    'Oluşturulma Tarihi',
    'Son Güncelleme',
    'Detay',
  ];

  ngOnInit(): void {
    this.getTicket();
  }

  Filter() {
    let filter: TicketFilter = new TicketFilter();
    filter.subject = this.filterText;
    this.ticketservice.GetFilter(filter).subscribe((res) => {
      this.Tickets = res.data;
    });
  }

  getTicket() {
    this.ticketservice.GetOpenPerson().subscribe((response) => {
      this.Tickets = response.data;
    });
  }

  openDialog(ticket: Ticket): void {
    let ticketdetail = this.ticketDetail
      .GetTicketDetail(ticket)
      .subscribe((res) => {
        let Detail = res.data;
        const dialogRef = this.dialog.open(TicketdetailComponent, {
          panelClass: ['overflow-auto', 'col-8'],
          data: { Detail },
        });
      });
  }
}
