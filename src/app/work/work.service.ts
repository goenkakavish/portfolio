import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Work } from './work.model';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  public index: BehaviorSubject<number> = new BehaviorSubject(null);
  workList: Work[] = [
    {
      projectName: 'Expresso-AI', imagePath: '../../../assets/Logo-dark.png', technology: 'Angular,Html,Css,Git', projectDescription: ['Initially handled the whole project individually and then scaled the project by building a team of 6 people after successful delivering release. Presently my role is to review code of team members, development and knowledge transfer to new members.',
        'Involved in Communication with client along with team lead and part of sprint planning and estimations.', 'Worked in visualization part like drawing graphs where I used NGX-Charts, and Charts.js.',
        'Developed common components and common service to maintain code quality and reusability.',
        'Developed data tables in Syncfusion, Datatable.net and Angular Material library.', 'Developed many reactive forms as per client’s requirement, files upload, folder upload and drag and drop functionality.',
        'Experience in upgrading version of angular from 8 to 9 and in developing role based access control in application.']
    },
    {
      projectName: 'Stock Application',
      imagePath: '../../../assets/stock.jpeg',
      technology: 'Angular,Node-JS,Html,Css,Git',
      projectDescription: ['Stock application developed in Angular as frontend Technology and in backend node was used. These was my first project after training. My role was to do the task provided by tech-lead in frontend as well as backend. On successful completion on a timely basis I was provided opportunity to handle whole new project Expresso-AI on individual basis.']
    }
  ];

  constructor() { }

  getWorkList() {
    return this.workList.slice();
  }
  getWork(index: number) {
    return this.workList[index];
  }

}
