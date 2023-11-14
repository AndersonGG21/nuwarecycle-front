import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private LOGIN_API_URL = "http://localhost:8080/api/v1/login";
  private http = inject(HttpClient);
  private cookie = inject(CookieService);
  private options = {
    observe : 'response' as const,
    headers : new HttpHeaders()
  }

  login(email: string, password: string) {
    let credentials = {
      email: email,
      password: password
    }
    this.http.post< HttpResponse<any> >(this.LOGIN_API_URL, {email, password}, {observe : 'response', headers : this.options.headers}).subscribe(
      (response) => {
        const token = response.headers.get("Authorization");
        
        if (token != null){
          this.cookie.set("Bearer", token.replace("Bearer", "").trim());
        }
      }, error => {
        alert("Wrong username or password");
      }
    )
  }
  
}
