import {Component, HostListener} from '@angular/core';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NzMenuModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check if window is scrolled more than 50px
    this.isScrolled = window.scrollY > 50;

    // Get the navbar element
    const navbar = document.querySelector('.navbar-container');

    // Add or remove the transparent class based on scroll position
    if (this.isScrolled) {
      navbar?.classList.remove('transparent');
    } else {
      navbar?.classList.add('transparent');
    }
  }

}
