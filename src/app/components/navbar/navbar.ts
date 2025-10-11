import {Component} from '@angular/core';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {RouterLink, RouterOutlet} from '@angular/router';
import {
  NzContentComponent,
  NzFooterComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzSiderComponent
} from 'ng-zorro-antd/layout';
import {NzIconDirective} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NzMenuModule, RouterLink, NzSiderComponent, NzLayoutComponent, NzHeaderComponent, NzIconDirective, NzContentComponent, NzFooterComponent, RouterOutlet],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  //isCollapsed = false;

}
