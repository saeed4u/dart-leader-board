import {AfterViewInit, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../model/requests.model";
import {ErrorService} from "../service/error/error.service";
import {Observable, of, race, zip} from "rxjs/index";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  email: string;
  password: string;
  loggingIn: boolean;
  valid: boolean;

  loginFormGroup: FormGroup;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private router: Router, private errorService: ErrorService) {
  }

  ngOnInit() {
    this.loggingIn = false;
    this.valid = false;
    this.buildLoginForm();
  }

  ngAfterViewInit() {
    this.errorService.$subject.subscribe((value) => {
      console.log(value);
    });
    this.errorService.$behaviorSubject.subscribe((value) => console.log(value));
    const firstData = of([1, 2, 3, 4, 5]);
    const secondData = of([2, 3, 5, 6]);

    zip(firstData, secondData, secondData)
      .subscribe((result) => {
        console.log(result[0]);
        console.log(result[1]);
        console.log(result[2]);
      });

  }

  private buildLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    this.listenForChanges();
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

  private listenForChanges() {
    this.loginFormGroup.valueChanges.subscribe({
      next: () => {
        this.valid = this.loginFormGroup.valid;
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
      }

    });

  }

  login() {
    console.log('called');
    const payload: LoginRequest = {
      username: 'username@email.com',
      password: 'password',
      client_id: 2,
      client_secret: 'QuOYVk5DsIzSUWYSObvufBiWs6EIBIbTsbHHDWTf',
      grant_type: 'password'
    };
    this.httpClient.post('https://pure-thicket-74090.herokuapp.com/oauth/token', payload, {headers: {accept: 'application/json'}})
      .subscribe({
        next: value => {
          console.log(value);
        },
        error: error => {
          console.log(error);
        }
      });
  }

  private getPasswordError() {
    const emailInput = this.loginFormGroup.get('password');
    if (emailInput.hasError('required')) {
      return 'Your password is required';
    } else if (emailInput.hasError('minlength')) {
      return 'Please enter a valid email';
    }
  }


}
