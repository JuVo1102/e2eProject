import { Component, OnInit } from '@angular/core';
import { authParameter } from '../../models/Authparameter';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { DataService } from 'src/app/services/route-data/route-data.service';
import { Router } from '@angular/router';
import { DbDataService } from 'src/app/services/db-data/db-data.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.page.html',
  styleUrls: ['./registry.page.scss'],
})

export class RegistryPage implements OnInit {

  registryForm: FormGroup;
  authService: AuthService = new AuthService();

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private dbDataService: DbDataService) {
    // Formgroup to validate inputs
    this.registryForm = this.formBuilder.group({
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
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/)
      ]))
    });
  }

  ngOnInit() {
  }

  // Submition of the form 
  public async submitForm() {
    try {
      if (this.registryForm.valid && this.registryForm.value.password == this.registryForm.value.confirmPassword) {
        const authParams: authParameter = {
          email: this.registryForm.value.email.toLowerCase(),
          password: this.registryForm.value.password,
        }
        await this.authService.doRegister(authParams);
        await this.Register(authParams);
      }
    } catch (error) {
      throw (error);
    }
  }

  // Registration on firebase via the authentification service
  public async Register(authparams: authParameter) {
    try {
      var login = await this.authService.doLogin(authparams);
      if (login) {
        this.dataService.setData(authparams.email, authparams);
        await this.dbDataService.setDbDataTitles(authparams.email);
        this.router.navigateByUrl(`/home/${authparams.email}`);
      }
    } catch (error) {
      throw (error);
    };
  }

}