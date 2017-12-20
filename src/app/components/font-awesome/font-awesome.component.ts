import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ascii-fa',
  template: `
    <i aria-hidden="true" [ngClass]="cssClasses"></i>
  `
})
export class FontAwesomeComponent implements OnInit {

  private _cssClasses: string[] = ['fa'];

  @Input() name: string;
  @Input() size?: string;
  @Input() fixed?: boolean;
  @Input() animation?: string;
  @Input() rotate?: string | number;
  @Input() inverse?: boolean;

  ngOnInit() {
    if (this.name) {
      this.addToCssClasses(`fa-${this.name}`);
    } else {
      throw new Error('Missing "name" property');
    }

    if (this.size) {
      this.addToCssClasses(`fa-${this.size}`);
    }

    if (this.fixed) {
      this.addToCssClasses(`fa-fw`);
    }

    if (this.animation) {
      this.addToCssClasses(`fa-${this.animation}`);
    }

    if (this.rotate) {
      const cssClass = (typeof this.rotate === 'number') ? `fa-rotate-${this.rotate}` : `fa-flip-${this.rotate}`;
      this.addToCssClasses(cssClass);
    }

    if (this.inverse) {
      this.addToCssClasses(`fa-inverse`);
    }
  }

  get cssClasses() {
    return this._cssClasses;
  }

  private addToCssClasses(cssClass: string): void {
    this._cssClasses.push(cssClass);
  }
}
