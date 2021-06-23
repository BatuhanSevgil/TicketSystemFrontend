import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Departments } from 'src/app/models/EventModel/Department';
import { Important } from 'src/app/models/EventModel/Important';
import { PersonName } from 'src/app/models/EventModel/PersonName';
import { Status } from 'src/app/models/EventModel/Status';
import { TicketEventService } from 'src/app/services/ticket-event.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TicketDetailFrom } from 'src/app/models/FormModels/TicketDetailForm';
import { Ticket } from 'src/app/models/Ticket';
import { TicketdetailService } from 'src/app/services/ticketdetail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ticketdetail',
  templateUrl: './ticketdetail.component.html',
  styleUrls: ['./ticketdetail.component.scss'],
})
export class TicketdetailComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ticketEvent: TicketEventService,
    private fromBuilder: FormBuilder,
    private detailService: TicketdetailService,
    private toastr: ToastrService
  ) {
    data.Detail.ticketDetails = data.Detail.ticketDetails.reverse();
  }

  ngOnInit(): void {
    this.getallImportant();
    this.getallStatus();
    this.getallDepartment();
    this.getallPersonName();
    this.frmCreate();
  }
  pValue: any;
  dValue: any;

  statusDetail: Status[] = [];
  importantDetail: Important[] = [];
  departmentDetail: Departments[] = [];
  personNameDetail: PersonName[] = [];

  frmTicketDetail: FormGroup;

  frmSubmit(ticketdetailFrom: TicketDetailFrom, ticket: Ticket) {
    let departmentValue = this.frmTicketDetail.value['toDepartmentId'];
    let personValue = this.frmTicketDetail.value['toPersonId'];
    let lastAssign: boolean = personValue > 0 || departmentValue > 0;

    if (!this.frmTicketDetail.valid || !lastAssign) {
      this.toastr.warning('Formu Doldurunuz');
    } else {
      let result = this.detailService
        .AddTicketDetail(ticketdetailFrom, ticket)
        .subscribe((res) => {
          this.ToastrShow(res.success);
          window.location.reload();
        });
    }
  }

  ToastrShow(result: Boolean) {
    if (result) {
      this.toastr.success('Cevap Gönderildi !');
    } else {
      this.toastr.error('cevap gönderilemedi');
    }
  }
  frmCreate() {
    this.frmTicketDetail = this.fromBuilder.group({
      description: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.nullValidator,
        ]),
      ],
      toStatusId: [],
      toImportantId: [],
      toPersonId: [''],
      toDepartmentId: [''],
    });

    this.frmTicketDetail.patchValue({
      toStatusId: this.data.Detail.statusId,
      toImportantId: this.data.Detail.importantId,
      toPersonId: this.data.Detail.ticketDetails[0].toPersonId,
      toDepartmentId: this.data.Detail.ticketDetails[0].toDepartmentId,
    });
  }

  getallStatus() {
    this.ticketEvent.GetAllStatusDetail().subscribe((res) => {
      this.statusDetail = res.data;
    });
  }

  getallImportant() {
    this.ticketEvent.GetAllImporantDetail().subscribe((res) => {
      this.importantDetail = res.data;
    });
  }

  getallDepartment() {
    this.ticketEvent.GetAllDepartmentDetail().subscribe((res) => {
      this.departmentDetail = res.data;
    });
  }

  getallPersonName() {
    this.ticketEvent.GetAllPersonRealName().subscribe((res) => {
      this.personNameDetail = res.data;
    });
  }
}
