import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/shared/auth/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    public service: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });

  returnUrl: string;

  ngOnInit(): void {
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/task-list';

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [Validators.required]),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(formData: any) {
    this.service.postLoginCredentials(formData).subscribe(
      (data: any) => {
        localStorage.setItem('jwt', JSON.parse(data).token);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'Logged in successfully',
        });
        this.router.navigateByUrl(this.returnUrl);
      },
      (error: string) => {
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error',
        });
      }
    );
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
}
