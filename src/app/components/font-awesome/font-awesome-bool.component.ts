import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ascii-fa-bool',
  template: `
    <i aria-hidden="true" [ngClass]="cssClasses"></i>
  `
})
export class FontAwesomeBoolComponent implements OnInit {

  private _cssClasses = ['fa'];

  @Input() bool: boolean;
  @Input() colorized = false;
  @Input() centered = true;

  ngOnInit() {
    if (this.bool) {
      this.addToCssClasses('fa-check');
      if (this.colorized) {
        this.addToCssClasses('text-success');
      }
    } else {
      this.addToCssClasses('fa-times');
      if (this.colorized) {
        this.addToCssClasses('text-danger');
      }
    }

    if (this.centered) {
      this.addToCssClasses('text-center');
    }
  }

  get cssClasses() {
    return this._cssClasses;
  }

  private addToCssClasses(cssClass: string): void {
    this._cssClasses.push(cssClass);
  }
}
