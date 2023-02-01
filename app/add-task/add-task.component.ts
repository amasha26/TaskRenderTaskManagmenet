import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TaskListService } from '../task-list.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  form: FormGroup;

  constructor(
    public service: TaskListService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  addTaskForm = this.fb.group({
    title: [''],
    description: [''],
    isCompleted: [false],
  });

  created = new Date().toUTCString;

  ngOnInit(): void {
    this.loadScript('assets/plugins/jquery/jquery.min.js');
    this.loadCustomScript();
    this.loadScript('assets/plugins/bootstrap/js/bootstrap.bundle.min.js');

    this.addTaskForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      isCompleted: new FormControl(false),
    });
  }

  get title() {
    return this.addTaskForm.get('title');
  }

  get description() {
    return this.addTaskForm.get('description');
  }

  onSubmit(formData: any) {
    this.service.postCreateTask(formData).subscribe(
      (data: any) => {
        console.log(formData);

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
          title: 'Task added successfully',
        });
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

  public loadScript(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

  public loadCustomScript() {
    let node = document.createElement('script');
    node.integrity = "$.widget.bridge('uibutton', $.ui.button)";
    node.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(node);
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
}
