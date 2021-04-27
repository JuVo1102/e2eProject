import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { authParameter } from 'src/app/models/authparameter';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DbDataService } from 'src/app/services/db-data/db-data.service';
import { DataService } from 'src/app/services/route-data/route-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  authService: AuthService = new AuthService();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private dbDataService: DbDataService
  ) {
    // Formgroup to validate inputs
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^([a-zA-Z0-9._%+-]{1,20})+@([a-zA-Z0-9.-]{1,20})+\.([a-z]{2,63})$/)
      ])),
      // One digit 0-9
      // One lowercase character 
      // One uppercase character
      // 8-32 characters
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/)
      ])),
    });
  }

  ngOnInit() {
  }

  // Submit of the form
  public async submitForm() {
    try {
      if (this.loginForm.valid) {
        const authparams: authParameter = {
          email: this.loginForm.value.email.toLowerCase(),
          password: this.loginForm.value.password
        }
        await this.Login(authparams);
      }
    } catch (error) {
      throw error;
    }
  }

  // Login on firebase via the authentification service
  public async Login(authparams: authParameter) {
    try {
      if (authparams && authparams.email.length > 0) {
        var login = await this.authService.doLogin(authparams);
        if (login) {
          this.dataService.setData(authparams.email, authparams);
          await this.dbDataService.setDbDataTitles(authparams.email);
          this.router.navigateByUrl(`/home/${authparams.email}`);
        }
      }
    } catch (error) {
      throw (error);
    }
  }
}
