import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/Ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { MatDialog, DialogPosition } from '@angular/material/dialog';
import { TicketdetailComponent } from '../../../ticketdetail/ticketdetail.component';
import { TicketdetailService } from 'src/app/services/ticketdetail.service';
import { TicketFilter } from 'src/app/models/TicketFilter';
import { DBOticket } from 'src/app/models/DB/DBOticket';
import { TicketEventService } from 'src/app/services/ticket-event.service';
import { Departments } from 'src/app/models/EventModel/Department';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
})
export class WorksComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private ticketservice: TicketService,
    public dboticket: DBOticket,
    private ticketDetail: TicketdetailService,
    private ticketEvent: TicketEventService,
    private toastr: ToastrService
  ) {}
  dialogsPosition: DialogPosition;

  filterText: string;

  public TicketDB: Ticket[] = this.dboticket.GetDB;

  selectedDepartment: number = 0;
  departmentDetail: Departments[] = [];
  Tickets: Ticket[];
  ticketHolder: Ticket;
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
    this.GetDepartment();
  }

  Filter() {
    let filter: TicketFilter = new TicketFilter();
    filter.subject = this.filterText;
    this.ticketservice.GetFilter(filter).subscribe((res) => {
      this.dboticket.DBOTicket = res.data;
    });
  }

  getTicket() {
    this.ticketservice.GetLastPerson().subscribe((response) => {
      this.dboticket.DBOTicket = response.data;
    });
  }

  GetDepartment() {
    this.ticketEvent.GetAllDepartmentDetail().subscribe((res) => {
      this.departmentDetail = res.data;
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

  ToastrShow(result: Boolean) {
    if (result) {
      this.toastr.success('Başarılı');
    } else {
      this.toastr.error('Başarısız');
    }
  }

  DepartmentFilter(Id: Number) {
    if (Id > 0) {
      this.ticketservice.GetTicketDepartment(Id).subscribe((res) => {
        this.ToastrShow(res.success);
        if (res.success) {
          this.dboticket.DBOTicket = res.data;
        }
      });
    } else {
      this.getTicket();
    }
  }
}
