import { Component, OnInit } from '@angular/core';
import { RestService } from '../shared/rest.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ScreenUtilsService } from '../shared/screen-utils.service';
import { Storage } from '@ionic/storage-angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  public email!: string;
  public password!: string;
  constructor(
    private auth: AngularFireAuth,
    private api: RestService,
    private storage: Storage,
    private router: Router,
    private screenUtils: ScreenUtilsService
  ) {}

  ngOnInit() {}

  async loginUser() {
    // start loader
    await this.screenUtils.doLoading('Authenticating...');

    // validate form input
    if (this.loginForm.valid) {
      const requestBody = this.loginForm.value;
      const loginRequest = await this.api.post('auth/signin', requestBody);

      if (loginRequest.success) {
        // stop loader
        await this.screenUtils.stopLoading();

        // show toast
        await this.screenUtils.presentToast(
          'bottom',
          'logged in successfully',
          1500
        );
        this.storage.set('login_token', loginRequest.message);
        this.router.navigateByUrl('user/dashboard');
      } else {
        // stop loader
        await this.screenUtils.stopLoading();

        // show toast
        await this.screenUtils.presentToast(
          'bottom',
          loginRequest.message,
          1500
        );
      }
    }
  }

  async googleLogin() {
    let loginDetails = await this.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    await this.screenUtils.doLoading('Authenticating...');
    const requestBody = {
      idToken: await loginDetails.user?.getIdToken(false),
    };
    const loginRequest = await this.api.post('auth/verify-token', requestBody);
    if (loginRequest.success) {
      // stop loader
      await this.screenUtils.stopLoading();

      // show toast
      await this.screenUtils.presentToast(
        'bottom',
        'logged in successfully',
        1500
      );
      this.storage.set('login_token', loginRequest.message);
      this.router.navigateByUrl('user/dashboard');
    } else {
      // stop loader
      await this.screenUtils.stopLoading();

      // show toast
      await this.screenUtils.presentToast('bottom', loginRequest.message, 1500);
    }
  }

  async facebookLogin() {}
}
