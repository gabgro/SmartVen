import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  template: ` <app-header></ app-header> 
  <router-outlet></router-outlet>
  `,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ecomm');
}
