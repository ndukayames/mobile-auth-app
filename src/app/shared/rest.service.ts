import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private apiUrl: string;

  constructor(private http: HttpClient, public storage: Storage) {
    this.apiUrl = environment.apiUrl;
  }

  async get(endpoint: string) {
    return await lastValueFrom(
      this.http.get(`${this.apiUrl}/${endpoint}`)
    ).catch((err) => {
      return err.error;
    });
  }

  async authGet(endpoint: string) {
    let token = await this.storage.get('login_token');
    let headers = new HttpHeaders({
      'content-type': 'application/json; charset=utf-8',
      Authorization: 'Bearer ' + token,
    });
    let options = {
      headers: headers,
    };
    return await lastValueFrom(
      this.http.get(`${this.apiUrl}/${endpoint}`, options)
    ).catch((err) => {
      console.log(err);
      return err.error;
    });
  }

  async post(endpoint: string, data: any): Promise<any> {
    // try {
    return await lastValueFrom(
      this.http.post(`${this.apiUrl}/${endpoint}`, data)
    ).catch((err) => {
      return err.error;
    });
  }

  async authPost(endpoint: string, data: any) {
    let token = await this.storage.get('login_token');
    let headers = new HttpHeaders({
      'content-type': 'application/json; charset=utf-8',
      Authorization: 'Bearer ' + token,
    });
    let options = {
      headers: headers,
    };
    return await lastValueFrom(
      this.http.post(`${this.apiUrl}/${endpoint}`, data, options)
    ).catch((err) => {
      return err.error;
    });
  }

  put(endpoint: string, data: any) {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data);
  }

  async authPut(endpoint: string, data: any) {
    let token = await this.storage.get('login_token');
    let headers = new HttpHeaders({
      'content-type': 'application/json; charset=utf-8',
      Authorization: 'Bearer ' + token,
    });
    let options = {
      headers: headers,
    };
    return await lastValueFrom(
      this.http.put(`${this.apiUrl}/${endpoint}`, data, options)
    ).catch((err) => {
      return err.error;
    });
  }

  delete(endpoint: string) {
    return this.http.delete(`${this.apiUrl}/${endpoint}`);
  }

  async authDelete(endpoint: string) {
    let token = await this.storage.get('login_token');
    let headers = new HttpHeaders({
      'content-type': 'application/json; charset=utf-8',
      Authorization: 'Bearer ' + token,
    });
    let options = {
      headers: headers,
    };
    return await lastValueFrom(
      this.http.delete(`${this.apiUrl}/${endpoint}`, options)
    ).catch((err) => {
      return err.error;
    });
  }
}
