import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Work } from '../work.model';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss']
})
export class WorkListComponent implements OnInit {
  workList: Work[];
  @Input() id: number;
  constructor(private workService: WorkService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.workList = this.workService.getWorkList();
    console.log(this.id);
  }
  onClickWork(index) {
    this.router.navigate(['work', index]);
  }
}
