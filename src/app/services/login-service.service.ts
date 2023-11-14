import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private LOGIN_API_URL = "http://localhost:8080/ap1/v1/login";
  private http = inject(HttpClient);
  private options = {
    observe : 'response' as const,
    headers : new HttpHeaders()
  }

  login(email: string, password: string) {
    let credentials = {
      email: email,
      password: password
    }
    this.http.post(this.LOGIN_API_URL, {email, password}, {observe : 'response', headers : this.options.headers}).subscribe(
      (response) => {
        const token = response.headers.get('Authorization');
        console.log(token);
      }
    )
  }
  
}
