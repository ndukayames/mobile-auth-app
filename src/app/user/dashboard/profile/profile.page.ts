import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EditProfileRequest } from 'src/app/models/edit-profile-request';

import { ProfileDetails } from 'src/app/models/profile-details';
import { RestService } from 'src/app/shared/rest.service';
import { ScreenUtilsService } from 'src/app/shared/screen-utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileDetails: ProfileDetails = {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  };

  editProfileStatus: boolean = false;

  editProfileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
  });

  requestBody: EditProfileRequest = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phoneNumber: undefined,
  };

  constructor(
    private api: RestService,
    private screenUtils: ScreenUtilsService
  ) {}
  // ngOnInit() {}

  async ngOnInit() {
    console.log('ion view will enter');
    await this.screenUtils.doLoading('please wait...');
    let getUserDataRequest = await this.api.authGet('users/me');
    if (getUserDataRequest.success) {
      await this.screenUtils.stopLoading();
      this.profileDetails = getUserDataRequest.message;
    }
  }
  editProfile() {
    console.log('editing profile toggle');
    this.editProfileStatus = !this.editProfileStatus;
  }
  async editProfileRequest() {
    await this.screenUtils.doLoading('please wait...');
    if (
      this.editProfileForm.get('firstName')!.touched &&
      this.editProfileForm.get('firstName')!.value
    ) {
      this.requestBody.firstName = <string>(
        this.editProfileForm.get('firstName')!.value
      );
    }
    if (
      this.editProfileForm.get('lastName')!.touched &&
      this.editProfileForm.get('lastName')!.value
    ) {
      this.requestBody.lastName = <string>(
        this.editProfileForm.get('lastName')!.value
      );
    }
    if (
      this.editProfileForm.get('email')!.touched &&
      this.editProfileForm.get('email')!.value
    ) {
      this.requestBody.email = <string>this.editProfileForm.get('email')!.value;
    }
    if (
      this.editProfileForm.get('phoneNumber')!.touched &&
      this.editProfileForm.get('phoneNumber')!.value
    ) {
      this.requestBody.phoneNumber = <string>(
        this.editProfileForm.get('phoneNumber')!.value
      );
    }

    // send api
    let editRequest = await this.api.authPut('users', this.requestBody);
    if (editRequest.success) {
      await this.screenUtils.stopLoading();
      await this.screenUtils.presentToast('bottom', 'account updated.', 1500);
      await this.ngOnInit();
    } else {
      await this.screenUtils.stopLoading();
      await this.screenUtils.presentToast('bottom', editRequest.message, 1500);
    }
  }

  async deleteAccount() {
    await this.screenUtils.doLoading('deleting account...');
    let deleteRequest = await this.api.authDelete('users/me');
    if (deleteRequest.success) {
      await this.screenUtils.stopLoading();
      await this.screenUtils.presentToast('bottom', 'account deleted.', 1500);

      // remove token
      this.api.storage.clear();
    } else {
      await this.screenUtils.stopLoading();
      await this.screenUtils.presentToast(
        'bottom',
        deleteRequest.message,
        1500
      );
    }
  }
}
