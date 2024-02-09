import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Navigation, Router, RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showBackButton: boolean = false;

  constructor(private route: ActivatedRoute) { }

  /* ngOnInit(): void {
    this.route.url.subscribe((urlSegments) => {
      console.log(urlSegments);
      const currentPath = urlSegments.join('/');
      // Update showBackButton based on the current path
      console.log(currentPath);
      this.showBackButton = currentPath != '/employees';
    });
  } */

}
