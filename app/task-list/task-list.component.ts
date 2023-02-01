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
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  form: FormGroup;

  constructor(
    public service: TaskListService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  data: [];

  ngOnInit(): void {
    this.loadScript('assets/plugins/jquery/jquery.min.js');
    this.loadCustomScript();
    this.loadScript('assets/plugins/bootstrap/js/bootstrap.bundle.min.js');

    this.service.getTasks().subscribe((data: any) => {
      this.data = data;
    })
  }

  onClickCheck(id:string) { 

    console.log(id);
    
    this.service.updateTask(id).subscribe((res: any) => { 
      if (res) {
        this.service.getTasks().subscribe((data: any) => {
          this.data = data
        })
      }
    })
  }
  
  onClickDelete(id: string) { 

    this.service.deleteTask(id).subscribe((res: any) => { 
      if (res) {
        this.service.getTasks().subscribe((data: any) => {
          this.data = data
        })
      }
    })
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
