import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  showContactsDrop: boolean = false;

  onShowDrop() {
    this.showContactsDrop = !this.showContactsDrop;
  }
}
