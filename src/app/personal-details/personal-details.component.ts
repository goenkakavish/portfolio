import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataShareServiceService } from '../data-share-service.service';
@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  portfolioSignIn: FormGroup;
  constructor(private router: Router,
    private dataShareService: DataShareServiceService) { }

  ngOnInit(): void {
    this.portfolioSignIn = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required]),
      designation: new FormControl(null, [Validators.required]),
      about: new FormControl(null, [Validators.required]),
      phoneNumber: new FormArray([new FormControl(null, [Validators.required])]),
      email: new FormControl(null, [Validators.required]),
      timelineDataEducation: new FormArray([this.initTimelineDataEducation()]),
      projects: new FormArray([this.initProjects()]),
      isExperience: new FormControl(false),
    })
  }

  initProjects(): FormGroup {
    return new FormGroup({
      projectName: new FormControl(null, [Validators.required]),
      imagePath: new FormControl(null, [Validators.required]),
      technology: new FormControl(null, [Validators.required]),
      projectDescription: new FormArray([new FormControl(null, [Validators.required])]),
    })
  }
  initTimelineDataEducation(): FormGroup {
    return new FormGroup({
      year: new FormControl(null, [Validators.required]),
      course: new FormControl(null, [Validators.required]),
      name_of_institute: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
      result: new FormControl(null, [Validators.required])
    })
  }
  addPhoneNumber() {
    const control = new FormControl(null, [Validators.required]);
    (<FormArray>this.portfolioSignIn.get('phoneNumber')).push(control);
  }

  onSubmit() {
    // this.dataShareService.personalDetails.next(this.portfolioSignIn.value)
    // this.router.navigate(['home']);
    console.log(this.portfolioSignIn);
  }
  removePhoneNumber(i) {
    return (this.portfolioSignIn.get('phoneNumber') as FormArray).removeAt(i);
  }
  toggleIsExperience() {

  }

  removeEducationFields(i) {
    return (this.portfolioSignIn.get('timelineDataEducation') as FormArray).removeAt(i);
  }
  addEducationFields() {
    const control = this.portfolioSignIn.controls.timelineDataEducation as FormArray;
    control.push(this.initTimelineDataEducation());
  }
  addProjectFields() {
    const control = this.portfolioSignIn.controls.projects as FormArray;
    control.push(this.initProjects());
  }
  removeProjectsFields(i) {
    return (this.portfolioSignIn.get('projects') as FormArray).removeAt(i);
  }
  addProjectDescription(i) {
    const control = new FormControl(null, [Validators.required]);
    (<FormArray>this.portfolioSignIn.controls.projects['controls'][i]['controls'].projectDescription['controls']).push(control);
  }
  removeProjectDescription(i, j) {
    return (this.portfolioSignIn.controls.projects['controls'][i]['controls'].projectDescription as FormArray).removeAt(j);
  }
}
