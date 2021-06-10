import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Departments } from 'src/app/models/EventModel/Department';
import { Important } from 'src/app/models/EventModel/Important';
import { PersonName } from 'src/app/models/EventModel/PersonName';
import { Status } from 'src/app/models/EventModel/Status';
import { newTicket } from 'src/app/models/FormModels/newTicket';
import { TicketEventService } from 'src/app/services/ticket-event.service';
import { TicketService } from 'src/app/services/ticket.service';
import { WhiteSpaceValidation } from 'src/app/Validation/WhiteSpaceValidation';

@Component({
  selector: 'app-addticketmodal',
  templateUrl: './addticketmodal.component.html',
  styleUrls: ['./addticketmodal.component.scss'],
})
export class AddticketmodalComponent implements OnInit {
  constructor(
    private ticketEvent: TicketEventService,
    private frmBuilder: FormBuilder,
    private ticketService: TicketService,
    private toastr: ToastrService
  ) {}

  frmNewTicket: FormGroup;

  ngOnInit(): void {
    this.getallImportant();
    this.getallStatus();
    this.getallDepartment();
    this.getallPersonName();
    this.frmCrate();
  }

  createTicket(ticket: newTicket) {
    let valid = ticket.toDepartmentId > 0 || ticket.toPersonId > 0;
    if (this.frmNewTicket.valid && valid) {
      this.ticketService.NewTicket(ticket).subscribe((res) => {
        this.ToastrShow(res.success);
        window.location.reload();
      });
    } else {
      this.toastr.warning('formu Doldurunuz!');
    }
  }

  ToastrShow(result: Boolean) {
    if (result) {
      this.toastr.success('Ticket Oluşturuldu');
    } else {
      this.toastr.error('Bir Hata oluştu');
    }
  }

  statusDetail: Status[] = [];
  importantDetail: Important[] = [];
  departmentDetail: Departments[] = [];
  personNameDetail: PersonName[] = [];

  pValue: any;
  dValue: any;
  frmCrate() {
    this.frmNewTicket = this.frmBuilder.group({
      subject: [
        '',
        Validators.compose([
          Validators.minLength(2),
          Validators.required,
          Validators.nullValidator,
        ]),
      ],

      description: [
        '',
        Validators.compose([
          Validators.minLength(2),
          Validators.required,
          Validators.nullValidator,
        ]),
      ],
      toStatusId: [
        1,
        Validators.compose([Validators.nullValidator, Validators.required]),
      ],
      toImportantId: [
        '',
        Validators.compose([Validators.nullValidator, Validators.required]),
      ],
      toDepartmentId: [
        0,
        Validators.compose([Validators.nullValidator, Validators.required]),
      ],
      toPersonId: [
        0,
        Validators.compose([Validators.nullValidator, Validators.required]),
      ],
    });
    this.frmNewTicket.patchValue({});
  }

  //#region  Event
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
  //#endregion
}
