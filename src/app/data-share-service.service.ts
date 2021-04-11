import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataShareServiceService {
  constructor() { }
  public isExperienced = (JSON.parse(localStorage.getItem('portfolioDetails'))).isExperience;
  fetchingDataOfUser() {
    let data = JSON.parse(localStorage.getItem('portfolioDetails'));
    return data;
  }

  fetchingDataOfTimeLineDataEducation() {
    let data: any = {};
    data = JSON.parse(localStorage.getItem('portfolioDetails'));
    return [...data.timelineDataEducation];
  }

  fetchingDataOfWorkList() {
    let data: any = {};
    data = JSON.parse(localStorage.getItem('portfolioDetails'));
    return [...data.projects];
  }


  fetchingDataOfTimeLineDataExperience() {
    let data: any = {};
    data = JSON.parse(localStorage.getItem('portfolioDetails'));
    return [...data.timelineDataExperience];
  }
}
