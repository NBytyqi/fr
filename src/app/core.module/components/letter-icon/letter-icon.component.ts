import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'letter-icon',
  templateUrl: './letter-icon.component.html',
  styleUrls: ['./letter-icon.component.css']
})
export class LetterIconComponent implements OnInit, OnChanges {

  public letter: any;

  @ViewChild('theletter', { static: true }) elem;
  @Input() color;
  @Input() data;
  @Input() colorHover;
  @Input() icon;
  @Input() charCount;
  @Input() size;
  @Input() box;
  @Input() border;
  @Input() customClass;

  constructor(private renderer: Renderer2) { }

  @HostListener('mouseenter')
  mouseEnter(ele) {
    if (this.colorHover && (this.parseColourString(this.colorHover) !== false || this.colorHover === 'auto')) {
      if (this.colorHover === 'auto') {
        this.addClass('hover');
      } else {
        let hoverColor, originalColor;
        hoverColor = this.parseColourString(this.colorHover);
        if (this.color && this.color !== 'auto') {
          originalColor = this.color;
        } else {
          originalColor = window.getComputedStyle(this.elem.nativeElement);
        }
        this.setCss('backgroundColor', `rgb('${hoverColor}')`);
      }
    }
  }

  @HostListener('mouseleave')
  mouseLeave(ele) {
    if (this.colorHover && (this.parseColourString(this.colorHover) !== false || this.colorHover === 'auto')) {
      if (this.colorHover === 'auto') {
        this.removeClass('hover');
      } else {
        let hoverColor, originalColor;
        hoverColor = this.parseColourString(this.colorHover);
        if (this.color && this.color !== 'auto') {
          originalColor = this.color;
        } else {
          originalColor = window.getComputedStyle(this.elem.nativeElement);
        }
        this.setCss('backgroundColor', originalColor);
      }
    }

  }

  addClass(name) {
    this.elem.nativeElement.classList.add(name);
  }

  removeClass(name) {
    this.elem.nativeElement.classList.remove(name);
  }

  setCss(prop: string, val: string) {
    this.renderer.setStyle(this.elem.nativeElement, prop, val);
  }

  parseColourString(s) {

    // Tokenise input
    const m = s.match(/^\#|^rgb\(|[\d\w]+$|\d{3}/g);

    // Other variables
    let value, values;
    let valid = true, double = false;

    // If no matches, return false
    if (!m) { return false; }


    // If hex value
    if (m.length < 3) {
      // Get the value
      value = m[m.length - 1];

      // Split into parts, either x,x,x or xx,xx,xx
      values = value.length === 3 ? double = true && value.split('') : value.match(/../g);

      // Convert to decimal values - if #nnn, double up on values 345 => 334455
      values.forEach(function (v, i) {
        values[i] = parseInt(double ? '' + v + v : v, 16);
      });

      // Otherwise it's rgb, get the values
    } else {
      values = m.length === 3 ? m.slice() : m.slice(1);
    }

    // Check that each value is between 0 and 255 inclusive and return the result
    values.forEach(function (v) {
      valid = valid ? v >= 0 && v <= 255 : false;
    });

    // If string is invalid, return false, otherwise return an array of the values
    return valid && values;
  }

  ngOnChanges(changes) {

    if (changes.icon) {
      this.elem.nativeElement.append('<i class="' + this.icon + '"></i>');
    }


    if (changes.data) {
      const val = changes.data.currentValue;
      const string = val.trim();
      const letter = '';

      if (this.color && this.color === 'auto') {
        this.removeClass(`letter-color-${val.charAt(0).toLowerCase()}`);
        this.addClass('letter-color-' + string.charAt(0).toLowerCase());
      }

      if (this.charCount && !isNaN(this.charCount)) {
        const newString = string.split(/(?=[A-Z])/);
        let count = parseInt(this.charCount, 10);

        if (count > newString.length) {
          count = newString.length;
        }

        for (let i = 0; i < count; i++) {
          this.letter = letter + newString[i].charAt(0);
        }

        this.letter = letter.toUpperCase();
      } else {
        this.letter = string.charAt(0).toUpperCase();
      }

    }

  }

  ngOnInit() {

    if (this.size && (this.size === 'sm' || this.size === 'lg')) {
      this.addClass('size-' + this.size);
    }

    if (this.customClass) {
      if (this.customClass.charAt(0) === '.') {
        this.customClass = this.customClass.substr(1);
      }

      this.addClass(this.customClass);
    }

    if (this.border) {
      this.addClass('border');
    }

    if (this.box && (this.box === 'round' || this.box === 'circle')) {
      this.addClass('box-' + this.box);
    }

    if (this.color && (this.parseColourString(this.color) !== false || this.color !== 'auto')) {
      let boxColor;
      // this.removeClass(`letter-color-${changes.data.previousValue.charAt(0).toLowerCase()}`);
      boxColor = this.parseColourString(this.color);
      this.setCss('background-color', `rgb(${boxColor})`);
    }




  }

}



