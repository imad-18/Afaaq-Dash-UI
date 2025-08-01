import {Component, HostListener, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NzMenuDirective, NzMenuGroupComponent, NzMenuItemComponent, NzSubMenuComponent} from 'ng-zorro-antd/menu';
import {Navbar} from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  //protected readonly title = signal('afaaqUI');

}
