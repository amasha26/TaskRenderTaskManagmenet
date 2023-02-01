import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
const baseUrl = 'http://127.0.0.1:8000/api/'

@Injectable({
  providedIn: 'root'
})
  
export class RegisterService {

  constructor(private http:HttpClient) { }

  
  addUser(formData: any) {
    console.log(formData)
    return this.http
      .post(baseUrl+'user/create',formData, {responseType:'text'})
      .pipe(
        catchError(
          this.handleError
        )
      )
  }

  handleError(error:any){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      console.log(error)
      if(error.status == 409)
        errorMessage = `An account is already registered with your email address.`;
      else{
        errorMessage = `Something went wront. Please try again.`
      }
    }

    Swal.fire({
      title: 'Error!',
      text: errorMessage,
      icon: 'error',
    })

    return throwError(() => {
      return errorMessage;
    });
  }

}
 