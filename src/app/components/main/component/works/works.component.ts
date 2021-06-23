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
import { Status } from 'src/app/models/EventModel/Status';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterForm } from 'src/app/models/FormModels/FilterForm';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
})
export class WorksComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private frmBuilder: FormBuilder,
    private ticketservice: TicketService,
    public dboticket: DBOticket,
    private ticketDetail: TicketdetailService,
    private ticketEvent: TicketEventService,
    private toastr: ToastrService
  ) {}
  dialogsPosition: DialogPosition;

  frmFilter: FormGroup;

  frmCreate() {
    this.frmFilter = this.frmBuilder.group({
      subject: [],
      statusId: [0],
      departmentId: [0],
    });
  }

  formFilter(filter: FilterForm) {
    console.log(filter);

    if (
      filter.departmentId == 0 &&
      filter.statusId == 0 &&
      filter.subject == null
    ) {
      this.getTicket();
    }
    this.ticketservice.GetFilter(filter).subscribe((res) => {
      this.ToastrShow(res.success);
      console.log(res.data);
      this.dboticket.DBOTicket = res.data;
    });
  }

  public TicketDB: Ticket[] = this.dboticket.GetDB;

  departmentDetail: Departments[] = [];
  statusDetail: Status[] = [];
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
    this.frmCreate();
    this.getTicket();
    this.GetStatus();
    this.GetDepartment();
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

  GetStatus() {
    this.ticketEvent.GetAllStatusDetail().subscribe((res) => {
      this.statusDetail = res.data;
    });
  }

  openDialog(ticket: Ticket): void {
    let ticketdetail = this.ticketDetail
      .GetTicketDetail(ticket)
      .subscribe((res) => {
        let Detail = res.data;
        const dialogRef = this.dialog.open(TicketdetailComponent, {
          panelClass: [
            'overflow-auto',
            //  'col-md-12 col-sm-12 col-xs-12 col-lg-8 col-xl-8 col-xxl-8',
            'col-md-12',
            'col-sm-12',
            'col-xs-12',
            'col-lg-8',
            'col-xl-8',
            'col-xxl-8',
            'p-0',
          ],
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
