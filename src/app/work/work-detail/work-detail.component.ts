import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WorkService } from '../work.service';

@Component({
  selector: 'app-work-detail',
  templateUrl: './work-detail.component.html',
  styleUrls: ['./work-detail.component.scss']
})
export class WorkDetailComponent implements OnInit {
  id: number;
  work: any;
  constructor(private workService: WorkService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params && Object.keys(params).length > 0) {
            this.id = +params['id'];
          } else {
            this.id = 0;
            this.router.navigate(['work', '0']);
          }
          this.workService.index.next(this.id);
          this.work = this.workService.getWork(this.id);
        }
      );
  }

}
