import { AuthService } from '../auth/auth.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent {
  @Input() user;
  constructor(public authService: AuthService) {
  }
}
