import { Router } from '@angular/router';
import { AlertService } from '../../shared/alerts/services/alert.service';
import { AuthService } from '../../core/auth/auth.service';
import { AvatarService } from './../../shared/avatar/avatar.service';
import { Component, OnInit } from '@angular/core';
import { ValidationManager } from 'ng2-validation-manager';
import { Avatar } from '../../shared/avatar/avatar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth_form.component.scss']
})


export class RegisterComponent implements OnInit {
  form;
  constructor(private authService: AuthService,
              private alert: AlertService,
              private avatarService: AvatarService,
              private router: Router) {}

  ngOnInit() {
    this.form = new ValidationManager({
      'username'    : 'required|minLength:4|alphaSpace',
      'first_name'  : 'required',
      'last_name'   : 'required',
      'email'       : 'required|email',
      'gender': 'required',
      'country'  : 'required',
      'nationality'  : 'required',
      'password'    : 'required|rangeLength:8,50',
      'repassword'  : 'required|equalTo:password',
    });
  }

  async register(registerForm) {
    try {
      const avatar : Avatar = await this.avatarService.getRandomAvatar();
      registerForm['avatar_user'] = avatar.id;
      await this.authService.register(registerForm);
      this.router.navigate(['/']);
    } catch (error) {
      this.alert.error(error);
    }
  }
}

