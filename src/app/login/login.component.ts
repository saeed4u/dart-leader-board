import {Component, OnInit} from "@angular/core";
import {LocalStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  loggingIn: boolean;

  loginFormGroup: FormGroup;

  constructor(private localStorage: LocalStorageService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.loggingIn = false;
    this.buildLoginForm();
  }

  private buildLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }


  getError(formName) {
    switch (formName) {
      case 'email':
        return this.getEmailError();
      case 'password':
        return this.getPasswordError();
    }
  }

  get name() {
    return this.loginFormGroup.get('name') as FormControl;
  }

  private getEmailError() {
    const emailInput = this.loginFormGroup.get('email');
    if (emailInput.hasError('required')) {
      return 'Your email is required';
    } else if (emailInput.hasError('pattern')) {
      return 'Please enter a valid email address';
    }
  }

  private getPasswordError() {
    const emailInput = this.loginFormGroup.get('password');
    if (emailInput.hasError('required')) {
      return 'Your password is required';
    } else if (emailInput.hasError('minlength')) {
      return 'Please enter a valid email';
    }
  }

  public login() {

  }


}
