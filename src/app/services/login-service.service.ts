import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

interface User {
  id : number,
  username: string,
  email : string,
  rol: string,
  profileImg : string,
}

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private LOGIN_API_URL = "http://localhost:8080/api/v1/login";
  private USERS_API_URL = "http://localhost:8080/api/v1/users";
  private http = inject(HttpClient);
  private cookie = inject(CookieService);
  private options = {
    observe : 'response' as const,
    headers : new HttpHeaders()
  }

  login(email: string, password: string) {
    this.http.post< HttpResponse<any> >(this.LOGIN_API_URL, {email, password}, {observe : 'response', headers : this.options.headers}).subscribe(
      (response) => {
        const token = response.headers.get("Authorization");
        
        if (token != null){
          this.cookie.set("Bearer", token.replace("Bearer", "").trim());
        }
      }, error => {
        alert("Wrong username or password");
      }, () => {
        this.http.get<User>(`${this.USERS_API_URL}/byEmail/${email}`).subscribe((user) => {
          this.cookie.set("uid", user.id.toString());
          this.cookie.set("username", user.username);
          this.cookie.set("rol", user.rol);
          this.cookie.set("profileImg", user.profileImg);                    
        })
      }
    )
  }

  createUser(username: string, email: string, password: string, profileImg: string){
    this.http.post<any>(this.USERS_API_URL, {username, email, password, profileImg});
  }
  
}
