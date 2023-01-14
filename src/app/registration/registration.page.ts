import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from '../shared/rest.service';
import { ScreenUtilsService } from '../shared/screen-utils.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  registrationForm = new FormGroup({
    firstName: new FormControl(undefined, [
      Validators.required,
      Validators.minLength(4),
    ]),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    password1: new FormControl('', [Validators.required]),
    password2: new FormControl('', [Validators.required]),
  });
  constructor(
    private api: RestService,
    private screenUtils: ScreenUtilsService
  ) {}

  ngOnInit() {}

  async registerUser() {
    if (this.registrationForm.valid) {
      await this.screenUtils.doLoading('creating account...');
      const requestBody = this.registrationForm.value;
      const registerUserRequest = await this.api.post(
        'auth/signup',
        requestBody
      );
      if (registerUserRequest.error) {
        await this.screenUtils.stopLoading();
        await this.screenUtils.presentToast(
          'bottom',
          registerUserRequest.error.message,
          1500
        );
      } else {
        await this.screenUtils.stopLoading();
        await this.screenUtils.presentToast(
          'bottom',
          registerUserRequest.message,
          1500
        );
      }
    } else {
      await this.screenUtils.stopLoading();

      await this.screenUtils.presentToast(
        'bottom',
        'Please confirm the details you entered are valid.',
        1500
      );
    }
  }
}
