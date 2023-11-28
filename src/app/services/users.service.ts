import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../type';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private USERS_API_URL = 'http://localhost:8080/api/v1/users';
  private http = inject(HttpClient);

  getAllUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.USERS_API_URL);
  }

}
