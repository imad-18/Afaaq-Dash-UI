import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  // Perform login
  login(email: string, password: string) {
    return this.http.post('http://localhost:8080/auth/login', { email, password }, { responseType: 'text' });
  }
}
