import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/shared/auth/register/register.service';
import Validation from 'src/app/shared/auth/register/validation.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  constructor(
    public service: RegisterService,
    private fb: FormBuilder,
    public router: Router
  ) {}

  registerForm = this.fb.group({
    fname: [''],
    lname: [''],
    age: [''],
    email: [''],
    password: [''],
    confirmPassword: [''],
  });
  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        fname: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),

        lname: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),

        email: new FormControl('', [Validators.required, Validators.email]),

        age: new FormControl('', [
          Validators.required,
          Validators.maxLength(3),
          Validators.minLength(1),
        ]),

        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),

        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  get fname() {
    return this.registerForm.get('fname');
  }
  
  get lname() {
    return this.registerForm.get('lname');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get age() {
    return this.registerForm.get('age');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  // formData:Register
  onSubmit(formData: any) {
    this.service.addUser(formData).subscribe((data: {}) => {
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
        title: 'Account created successfully. Please log in',
      });
      this.router.navigate(['/login']);
    });
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
}
