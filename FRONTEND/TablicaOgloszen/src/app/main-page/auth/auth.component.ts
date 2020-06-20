import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoginUser, RegisterUser } from 'src/app/shared/api-models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  //hide passwords in forms 
  hide = true;
  hide2 = true;

  invalidLogin = false;
  invalidRegister = false;
  registerSpinnerActive = false;
  loginSpinnerActive = false;

  registerForm = new FormGroup({
    registerLogin: new FormControl('', [Validators.email, Validators.required, Validators.min(6)]),
    registerPassword: new FormControl('', [Validators.required, Validators.min(5)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]),
    firstName: new FormControl('', [Validators.required, Validators.min(3)]),
    lastName: new FormControl('', [Validators.required, Validators.min(3)]),
  });

  //login

  login = '';
  password = '';

  @ViewChild('f', {static: true}) myNgForm;

  constructor(private authHttp: AuthService, private router: Router, private _snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  loginUser() {
    this.loginSpinnerActive = true;
    const user: LoginUser = {
      login: this.login,
      password: this.password
    };
    this.authHttp.loginUser(user).subscribe(
      res => {
        //console.log('Zalogowany');
        //console.log(res);
        localStorage.setItem('token', res);
        this.loginSpinnerActive = false;
        this.router.navigate(['../../user-panel']);
      }, err => {
        this.loginSpinnerActive = false;
        this.invalidLogin = true;
      }
    );
  }

  registerUser(event) {
    if(this.registerForm.valid){
      this.registerSpinnerActive = true;
      const user: RegisterUser = {
        login: this.registerForm.get('registerLogin').value,
        password: this.registerForm.get('registerPassword').value,
        phoneNumber: this.registerForm.get('phoneNumber').value,
        firstName: this.registerForm.get('firstName').value,
        lastName: this.registerForm.get('lastName').value
      };
      this.authHttp.registerUser(user).subscribe(res => {
        //console.log(res);
        this.registerSpinnerActive = false;
        this.message = 'Zostałeś poprawnie zarejestrowany!';
        this.openSnackBar();
      }, er => {
        this.registerSpinnerActive = false;
        //console.log(er);
        this.invalidRegister = true;
        setTimeout(function () {
          this.invalidRegister = false;
          //console.log(this.invalidRegister);
        }.bind(this), 10000)
        this.message = 'Coś poszło nie tak';
        this.openSnackBar();
      }, () => {
        this.myNgForm.reset();
      });
      event.currentTarget.reset();
    }
  }

  message = 'Ok';
  action = '';

  openSnackBar() {
    this._snackbar.open(this.message, this.action, {
      duration: 5000,
    });
  }

  //validation

  getEmailErrorMessage() {
    return this.registerForm.get('registerLogin').hasError('required') ? 'Musisz wprowadzić wartość' :
    this.registerForm.get('registerLogin').hasError('email') ? 'Nieprawidłowy adres e-mail' :
            '';
  }
  getPhoneErrorMessage() {
    return this.registerForm.get('phoneNumber').hasError('required') ? 'Musisz wprowadzić wartość' :
    this.registerForm.get('phoneNumber').hasError('pattern') ? 'Nieprawidłowa ilość cyfr' :
            '';
  }
}
