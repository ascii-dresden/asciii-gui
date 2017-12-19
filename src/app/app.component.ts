import { Component } from '@angular/core';

@Component({
  selector: 'ascii-root',
  template: `
    <ascii-navigation></ascii-navigation>
    <router-outlet></router-outlet>
  `
})
export class AppComponent { }
