import { Component, Input, OnInit } from '@angular/core';
import { Session } from '../models/session.model';
import { DurationService } from '../services/duration.service';

@Component({
  selector: 'app-session-block',
  templateUrl: './session-block.component.html',
  styleUrls: ['./session-block.component.css']
})
export class SessionBlockComponent implements OnInit {
  @Input() session: Session = {
    startDate: new Date(),
    endDate: new Date()
  };
  total = 24;
  leftMarginWidth = '0%';
  width = '0%';
  colour = 'rgba(240, 248, 255, 0.3)';
  startPos = 0;
  endPos = 0;

  constructor(private durationService: DurationService) {}

  ngOnInit(): void {
    this.startPos = this.session.startDate.getHours();
    this.endPos = this.session.endDate.getHours();
    if (this.endPos === 0) { this.endPos = 24; }
    this.leftMarginWidth = ((this.startPos / this.total) * 100).toString() + '%';
    this.width = ((this.durationService.getDelta(this.session) / this.total) * 100).toString() + '%';
    this.colour = this.randomColour();
  }

  private randomColour() {
    const o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 0.3 + ')';
  }

}
