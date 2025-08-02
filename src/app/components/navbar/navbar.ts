import {Component, HostListener} from '@angular/core';
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
import {NzBreadCrumbComponent, NzBreadCrumbItemComponent} from 'ng-zorro-antd/breadcrumb';
import {Campaigns} from '../campaigns/campaigns';
import {Activities} from '../activities/activities';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NzMenuModule, RouterLink, NzSiderComponent, NzLayoutComponent, NzHeaderComponent, NzIconDirective, NzContentComponent, NzBreadCrumbComponent, NzBreadCrumbItemComponent, NzFooterComponent, Campaigns, Activities, RouterOutlet],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isCollapsed = false;

}
