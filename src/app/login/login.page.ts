import { Component, OnInit } from '@angular/core';
import { RestService } from '../shared/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email!: string;
  public password!: string;
  constructor(private api: RestService, private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    const data = {
      email: this.email,
      password: this.password,
    };
    // this.api.post('auth/signin', data).subscribe((response) => {
    //   console.log(response);
    // });
    this.router
      .navigateByUrl('user/dashboard')
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
}
