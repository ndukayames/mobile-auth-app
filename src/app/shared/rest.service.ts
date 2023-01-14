import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
    console.log(1, this.apiUrl);
  }

  get(endpoint: string) {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }

  async post(endpoint: string, data: any): Promise<any> {
    // try {
    return await firstValueFrom(
      this.http.post(`${this.apiUrl}/${endpoint}`, data)
    ).catch((err) => {
      return err;
    });
    // } catch (error) {
    //   console.log(error);
    //   return error;
    // }
  }

  put(endpoint: string, data: any) {
    return this.http.put(`${this.apiUrl}/${endpoint}`, data);
  }

  delete(endpoint: string) {
    return this.http.delete(`${this.apiUrl}/${endpoint}`);
  }
}
