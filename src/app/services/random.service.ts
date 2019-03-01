import { Injectable } from '@angular/core';

@Injectable()
export class RandomService {
 
    randomInt(max: number) {
      return Math.floor(Math.random() * (max));
    }

}
