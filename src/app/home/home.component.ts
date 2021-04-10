import { Component, OnInit } from '@angular/core';
import { DataShareServiceService } from '../data-share-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dataShareService: DataShareServiceService) { }
  detailsUser: any;

  ngOnInit(): void {
    // this.detailsUser = this.dataShareService.personalDetails.subscribe(details => {
    //   this.detailsUser = details;
    //   console.log(this.detailsUser);
    // })
  }

}
