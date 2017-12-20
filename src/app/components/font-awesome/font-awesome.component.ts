import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ascii-fa',
  template: `
    <i aria-hidden="true" [ngClass]="classes"></i>
  `,
  styles: []
})
export class FontAwesomeComponent implements OnInit {

  private _classes: string[] = ['fa'];

  @Input() name: string;
  @Input() title?: string;
  @Input() size?: string;
  @Input() fixed?: boolean;
  @Input() animation?: string;
  @Input() rotate?: string | number;
  @Input() inverse?: boolean;

  constructor() { }

  ngOnInit() {
    if (this.name) {
      this.addToClasses(`fa-${this.name}`);
    } else {
      throw new Error('Missing "name" property');
    }

    if (this.size) {
      this.addToClasses(`fa-${this.size}`);
    }

    if (this.fixed) {
      this.addToClasses(`fa-fw`);
    }

    if (this.animation) {
      this.addToClasses(`fa-${this.animation}`);
    }

    if (this.rotate) {
      const cssClass = (typeof this.rotate === 'number') ? `fa-rotate-${this.rotate}` : `fa-flip-${this.rotate}`;
      this.addToClasses(cssClass);
    }

    if (this.inverse) {
      this.addToClasses(`fa-inverse`);
    }
  }

  get classes() {
    return this._classes;
  }

  private addToClasses(cssClass: string): void {
    this._classes.push(cssClass);
  }
}
