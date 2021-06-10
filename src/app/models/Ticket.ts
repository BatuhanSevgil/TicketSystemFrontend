import { TicketDetailDto } from './TicketDetailDto';

export class Ticket {
  ticketId: number;
  subject: string;
  openDate: Date;
  openPersonName: string;
  lastAssignment: string;
  lastUpdateDate: Date;
  status: string;
  important: string;
  OpenPersonId: number;
  StatusId: number;
  ImportantId: number;
  ticketDetails: Array<TicketDetailDto>[];
}
