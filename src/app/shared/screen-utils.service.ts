import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ScreenUtilsService {
  constructor(
    private loadingCtrl: LoadingController,
    private toastController: ToastController
  ) {}

  async doLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message: message,
      spinner: 'bubbles',
    });

    loading.present();
  }

  async stopLoading() {
    await this.loadingCtrl.dismiss();
  }

  async presentToast(
    position: 'top' | 'middle' | 'bottom',
    message: string,
    duration: number
  ) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      icon: 'close-circle',
    });

    await toast.present();
  }
}
