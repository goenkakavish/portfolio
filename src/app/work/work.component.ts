import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkService } from './work.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent implements OnInit, OnDestroy {
  indexWork: number;
  subscription: any;
  constructor(private workService: WorkService) { }
  ngOnInit(): void {
    setTimeout(() => {
      this.subscription = this.workService.index.subscribe((index) => {
        this.indexWork = index;
      })
    }, 0)
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
