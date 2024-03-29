import { Component, OnInit } from '@angular/core';
import { DataShareServiceService } from '../data-share-service.service';
import { timeLineListEducation, timeLineListExperience } from './about.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  timeLineDataEducation: timeLineListEducation[];
  timelineDataExperience: timeLineListExperience[];
  constructor(
    private dataShareService: DataShareServiceService
  ) { }

  ngOnInit(): void {

    //Fetching the Education Data.
    this.timeLineDataEducation = this.dataShareService.fetchingDataOfTimeLineDataEducation();


    //Check if the Candidate is Experience then fetching the Experience Data.
    if (this.dataShareService.isExperienced) {
      this.timelineDataExperience = this.dataShareService.fetchingDataOfTimeLineDataExperience();
    }
  }

}


// this.timeLineDataEducation = [{ year: 2019, course: 'B.E in Computer Engineering', name_of_institute: 'Babaria Institute of Technology', location: 'vadodara', result: 8.34 },
    // { year: 2015, course: 'HSC-(G.B.S.E)', name_of_institute: 'Rajasthan English Higher Secondary School', location: 'Ahmedabad', result: 8.34 },
    // { year: 2013, course: 'SSC-(G.B.S.E)', name_of_institute: 'Rajasthan English Higher Secondary School', location: 'Ahmedabad', result: 8.34 }];

    // this.timelineDataExperience = [{ duration: 'March,2 2020 - ongoing', company_name: 'Aspire Software Solutions', designation: 'Associate Software Engineer', description: ['Working on client facing web development in Agile process.', 'Client Communication and Estimations.', 'Review Code and Knowledge Transfer to team Members.'] },
    // { duration: 'December,2 2019 - March,2 2020', company_name: 'Aspire Software Solutions', designation: 'Trainee Engineer', description: ['Training in Javascript,Angular,Node-Js.', 'Make Application for Uploading government documents and show details in Angular.'] }]