import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-inline-editable',
  templateUrl: './inline-editable.component.html',
  styleUrls: ['./inline-editable.component.scss']
})
export class InlineEditableComponent implements OnInit, OnChanges {
  @Input() initialValue: string = null;
  @Input() saveOnBlur = false;
  @Output() save = new EventEmitter<string>();

  @ViewChild('editInput') editInput: ElementRef;

  editing = false;
  editValue: string;
  isFocused = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.clear();
  }

  onEnableEdit() {
    this.editing = true;
    this.editValue = this.initialValue;

    setTimeout(() => {
      if (this.editInput) {
        this.editInput.nativeElement.focus();
      }
    }, 1);
  }

  clear() {
    this.editing = null;
    this.editValue = null;
  }

  onEnter(value) {
    this.save.emit(value);
    this.clear();
  }

  delayClear() {
    setTimeout(() => {
      if (!this.isFocused) {
        if (this.saveOnBlur) {
          this.onEnter(this.editValue);
        } else {
          this.clear();
        }
      }
    }, 1000);
  }

  onEsc() {
    this.clear();

  }

}
