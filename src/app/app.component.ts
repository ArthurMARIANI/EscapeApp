import { Component } from '@angular/core';
import { User } from './shared/user/user';
import { UserService } from './shared/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public user : User;
  constructor(private userService: UserService) {
    this.userService.getUserMe()
      .then(user => {
        this.user = user;
      },
      error => {
        console.error(error);
      });
  }
}
