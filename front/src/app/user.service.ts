import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8800/user';

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(`${this.userUrl}/signup`, user);
  }
}
