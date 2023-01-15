import { Component } from '@angular/core';
import { environment } from './../environments/environment';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storage: Storage, private router: Router) {
    console.log(environment.production);
  }
  async ngOnInit() {
    await this.storage.create();
    // check if user is logged in
    let token = await this.storage.get('login_token');
    if (token) {
      this.router.navigateByUrl('user/dashboard');
    }
  }
}
