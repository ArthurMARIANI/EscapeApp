import { AlertService } from '../../shared/alerts/services/alert.service';
import { AuthService } from '../../core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationManager } from 'ng2-validation-manager';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth_form.component.scss']
})
export class LoginComponent implements OnInit {
  form;
  constructor(private authService: AuthService,
              private alert: AlertService,
              private router: Router) { }

  ngOnInit() {

    this.form = new ValidationManager({
      'identifier'  : 'required',
      'password'    : 'required',
    });
  }

  async login(formData) {
    try {
      await this.authService.login(formData);
      this.router.navigate(['/']);
    } catch (error) {
      this.alert.error(error);
    }
  }
}
