import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean{
    const auth_token = localStorage.getItem("jwt")
    if(auth_token){
      let exp = !this.jwtHelper.isTokenExpired(auth_token);
      return exp;
    }
    
    return false;
  }

  public getUserDetails(): object{
    const auth_token = localStorage.getItem("jwt");
    if(auth_token){
      const tokenPayload: any = decode(auth_token);
      
      const obj = {
        exp: tokenPayload["exp"],
        fname: tokenPayload["fname"],
        lname: tokenPayload["lname"],
        email: tokenPayload["email"],
        age: tokenPayload["age"],
        
      }
      return obj;
    }

    return {};
  }
}
