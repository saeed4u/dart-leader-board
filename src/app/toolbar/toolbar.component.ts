import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  loggedIn: boolean;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  logOut() {
    this.router.navigate(['/login']);
  }

}
