import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-nav-layout',
  templateUrl: './nav-layout.component.html',
  styleUrls: ['./nav-layout.component.css'],
})
export class NavLayoutComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  fname: "";
  lname: "";

  ngOnInit(): void {
    this.loadScript('assets/plugins/jquery/jquery.min.js');
    this.loadCustomScript();
    this.loadScript('assets/plugins/bootstrap/js/bootstrap.bundle.min.js');
    this.loadScript('assets/dist/js/adminlte.js');

    const userData: any = this.auth.getUserDetails();
    
 
    this.fname = userData['fname'];
    this.lname = userData['lname'];
    
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
