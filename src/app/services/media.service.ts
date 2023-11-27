import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private http = inject(HttpClient);

  uploadFile(formData : FormData) : Observable<any>{
    return this.http.post('http://localhost:8080/media/upload', formData);
  }
}
