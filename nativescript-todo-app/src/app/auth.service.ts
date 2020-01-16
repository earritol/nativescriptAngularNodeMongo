import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import { getString, setString } from "tns-core-modules/application-settings";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://192.168.100.7:3000/todos';
  constructor(private http: HttpClient, private router: Router) { }

  signUpUser(user) {
    let options = this.createRequestHeader();
    return this.http.post<any>(this.URL + '/signup',  user , { headers: options });
  }


  signInUser(user) {
    let options = this.createRequestHeader();
    return this.http.post<any>(this.URL + '/signin',  user , { headers: options });
  }

  loggedIn() {
    return !!getString("token");
  }

//   logout() {
//     localStorage.removeItem('token');
//     this.router.navigate(['/tasks']);
//   }

  getToken() {
    return getString("token");
  }

  private createRequestHeader() {
    // set headers here e.g.
    let headers = new HttpHeaders({
        // "AuthKey": "my-key",
        // "AuthToken": "my-token",
        "Content-Type": "application/json",
     });

    return headers;
}

}
