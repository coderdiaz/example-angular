import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    HeaderComponent,
  ],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent {

}
