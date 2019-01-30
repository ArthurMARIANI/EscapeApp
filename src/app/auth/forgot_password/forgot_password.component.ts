import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { AlertService } from '../../shared/alerts/services/alert.service';
import { Router } from '@angular/router';
import { ValidationManager } from 'ng2-validation-manager';

@Component({
  selector: 'app-forgot_password',
  templateUrl: './forgot_password.component.html',
  styleUrls: ['../auth_form.component.scss']

})

export class ForgotPasswordComponent implements OnInit {
  form;
  constructor(private authService: AuthService,
    private alert: AlertService) { }

  ngOnInit() {

    this.form = new ValidationManager({
      'email': 'required',
    });
  }

  async recoverPassword(formData) {
    try {
      this.authService.recoverpassword(formData);
    } catch (error) {
      this.alert.error(error);
    }
  }
}
