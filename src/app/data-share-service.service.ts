import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareServiceService {
  personalDetails = new BehaviorSubject(null);
  constructor() { }
}
