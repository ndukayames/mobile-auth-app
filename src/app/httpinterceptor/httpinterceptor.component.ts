import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-httpinterceptor',
  templateUrl: './httpinterceptor.component.html',
  styleUrls: ['./httpinterceptor.component.scss'],
})
export class HttpinterceptorComponent implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req)
    return next.handle(req);
  }

  ngOnInit() {}

}
