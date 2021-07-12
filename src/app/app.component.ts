import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Session } from './models/session.model';
import { DurationService } from './services/duration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  startTime: FormControl = new FormControl(0, [Validators.required, Validators.min(0), Validators.max(24)]);
  endTime: FormControl = new FormControl(0, [Validators.required, Validators.min(0), Validators.max(24)]);
  sessionForm: FormGroup = this.formBuilder.group({
    'start': this.startTime,
    'end': this.endTime
  });;
  today = new Date();
  sessions: Session[] = [];
  duration = '';
  showError = false;

  constructor(private formBuilder: FormBuilder, private durationService: DurationService) {}

  addNewSession() {
    if (this.sessionForm.valid && this.startTime.value < this.endTime.value) {
      this.showError = false;
      this.sessions.push({
        startDate: new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), this.startTime.value, 0, 0, 0),
        endDate: new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), this.endTime.value, 0, 0, 0),
      });
      this.sessions = this.orderSessionsArray(this.sessions);
      this.duration = this.durationService.calulateDuration(this.sessions);
    } else {
      this.showError = true;
    }
  }

  private orderSessionsArray(arr: Session[]): Session[] {
    arr.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    return arr;
  }

}
