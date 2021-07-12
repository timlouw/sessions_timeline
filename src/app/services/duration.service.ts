import { Injectable } from '@angular/core';
import { Session } from '../models/session.model';

@Injectable({
    providedIn: 'root',
})
export class DurationService {
    duration = 0;
    hoursArr: {hour: number, used: boolean}[] = [];

    constructor() {
      for (let i = 0; i <= 24; i++) {
        this.hoursArr.push({
          hour: i,
          used: false
        });
      }
    }

    calulateDuration(arr: Session[]): string {
      this.duration = 0;

      arr.forEach((session) => {
          this.markAsUsed(session.startDate.getHours(), session.endDate.getHours());
      });

      this.hoursArr.forEach(e => {
        if (e.used) {
          this.duration = this.duration + 1;
        }
      });

      return this.duration.toString();
    }

    public getDelta(session: Session): number {
      const startPos = session.startDate.getHours();
      let endPos = session.endDate.getHours();
      if (endPos === 0) { endPos = 24; }
      return endPos - startPos;
    }

    private markAsUsed(startIndex: number, endIndex: number) {
      if (endIndex === 0) { endIndex = 24; }
      for (let i = startIndex; i < endIndex; i++) {
        this.hoursArr[i].used = true;
      }
    }

}
