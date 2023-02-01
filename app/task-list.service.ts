import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
const baseUrl = 'http://127.0.0.1:8000/api/task/';

@Injectable({
  providedIn: 'root',
})
export class TaskListService {
  constructor(private http: HttpClient) {}

  postCreateTask(formData: any) {
    let auth_token = localStorage.getItem('jwt');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth_token}`,
    });

    return this.http
      .post(baseUrl + 'create', formData, {
        headers,
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  getTasks() {
    return this.http
      .get(baseUrl + 'get-alltasks', { responseType: 'json' })
      .pipe(catchError(this.handleError));
  }

  updateTask(id: string) {
    return this.http
      .put(baseUrl + 'update-task', { id: id }, { responseType: 'json' })
      .pipe(catchError(this.handleError));
  }

  deleteTask(id: string) {
    return this.http
      .post(baseUrl + 'delete-task', { id: id }, { responseType: 'json' })
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    console.log(error);
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Something went wront. Please try again.`;
    }

    Swal.fire({
      title: 'Error!',
      text: errorMessage,
      icon: 'error',
    });

    return throwError(() => {
      return errorMessage;
    });
  }
}
