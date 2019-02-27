import { Injectable } from '@angular/core';

@Injectable()
export class CloneService {
  clone(object) {
    return JSON.parse(JSON.stringify(object));
  }
}
