import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {Campaign} from '../../../models/Campaign';
import {Activity} from '../../../models/Activity';

@Component({
  selector: 'app-create-update-activity',
  imports: [
    FormsModule,
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzRowDirective
  ],
  templateUrl: './create-update-activity.html',
  styleUrl: './create-update-activity.css'
})
export class CreateUpdateActivity {
  @Input() activity: Activity | null = null; // null = create mode
  @Output() close = new EventEmitter<void>();

  formActivity: Activity = {
    id: 0,
    title: '',
    description: '',
    albums: [],
    category: '',
    duration: '',
    effective: 0,
    feedback: '',
    goals: [],
    iconPath: '',
    launchDate: '',
    location: ''
  };

  albumsInput: string = '';
  gaolsInput: string = '';

  onSubmit() {

  }

  onCancel() {
    this.close.emit();
  }
}
