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
    //Fetching the Personal Details.
    this.detailsUser = this.dataShareService.fetchingDataOfUser();
  }

}
