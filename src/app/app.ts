import {Component, HostListener, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NzMenuDirective, NzMenuGroupComponent, NzMenuItemComponent, NzSubMenuComponent} from 'ng-zorro-antd/menu';
import {Navbar} from './components/navbar/navbar';
import {Footer} from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  //protected readonly title = signal('afaaqUI');

}
