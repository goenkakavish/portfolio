import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    private readonly changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.portfolioSignIn = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required]),
      designation: new FormControl(null, [Validators.required]),
      about: new FormControl(null, [Validators.required]),
      phoneNumber: new FormArray([new FormControl(null, [Validators.required])]),
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      timelineDataEducation: new FormArray([this.initTimelineDataEducation()]),
      projects: new FormArray([this.initProjects()]),
      isExperience: new FormControl(false),
      timelineDataExperience: new FormArray([
        new FormGroup({
          duration: new FormControl(null),
          company_name: new FormControl(null),
          designation: new FormControl(null),
          description: new FormArray([new FormControl(null)]),
        })
      ])
    })
  }

  initTimelineDataExperience(): FormGroup {
    return new FormGroup({
      duration: new FormControl(null, [Validators.required]),
      company_name: new FormControl(null, [Validators.required]),
      designation: new FormControl(null, [Validators.required]),
      description: new FormArray([new FormControl(null, [Validators.required])]),
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
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
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
    localStorage.setItem('portfolioDetails', JSON.stringify(this.portfolioSignIn.value));
    console.log(this.portfolioSignIn);
    this.router.navigate(['home']);
  }
  removePhoneNumber(i) {
    return (this.portfolioSignIn.get('phoneNumber') as FormArray).removeAt(i);
  }
  toggleIsExperience() {
    if (this.portfolioSignIn.get('isExperience').value) {
      for (let i = 0; i < this.portfolioSignIn['controls'].timelineDataExperience['controls'].length; i++) {
        this.portfolioSignIn.controls.timelineDataExperience['controls'][i]['controls'].duration.setValidators([Validators.required]);
        this.portfolioSignIn.controls.timelineDataExperience['controls'][i]['controls'].company_name.setValidators([Validators.required]);
        this.portfolioSignIn.controls.timelineDataExperience['controls'][i]['controls'].designation.setValidators([Validators.required]);
        for (let j = 0; j < this.portfolioSignIn['controls'].timelineDataExperience['controls'][i]['controls'].description['controls'].length; j++) {
          this.portfolioSignIn['controls'].timelineDataExperience['controls'][i]['controls'].description['controls'][j].setValidators([Validators.required]);
        }
      }

    } else {
      for (let i = 0; i < this.portfolioSignIn['controls'].timelineDataExperience['controls'].length; i++) {
        this.portfolioSignIn.controls.timelineDataExperience['controls'][i]['controls'].duration.clearValidators();
        this.portfolioSignIn.controls.timelineDataExperience['controls'][i]['controls'].company_name.clearValidators();
        this.portfolioSignIn.controls.timelineDataExperience['controls'][i]['controls'].designation.clearValidators();
        for (let j = 0; j < this.portfolioSignIn['controls'].timelineDataExperience['controls'][i]['controls'].description['controls'].length; j++) {
          this.portfolioSignIn['controls'].timelineDataExperience['controls'][i]['controls'].description['controls'][j].clearValidators();
        }
      }
    }
    for (let i = 0; i < this.portfolioSignIn['controls'].timelineDataExperience['controls'].length; i++) {
      this.portfolioSignIn.controls.timelineDataExperience['controls'][i]['controls'].duration.updateValueAndValidity();
      this.portfolioSignIn.controls.timelineDataExperience['controls'][i]['controls'].company_name.updateValueAndValidity();
      this.portfolioSignIn.controls.timelineDataExperience['controls'][i]['controls'].designation.updateValueAndValidity();
      for (let j = 0; j < this.portfolioSignIn['controls'].timelineDataExperience['controls'][i]['controls'].description['controls'].length; j++) {
        this.portfolioSignIn['controls'].timelineDataExperience['controls'][i]['controls'].description['controls'][j].updateValueAndValidity();
      }
    }
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
  addExperienceFields() {
    const control = this.portfolioSignIn.controls.timelineDataExperience as FormArray;
    control.push(this.initTimelineDataExperience());
  }
  removeExperienceFields(i) {
    return (this.portfolioSignIn.get('timelineDataExperience') as FormArray).removeAt(i);
  }
  removeProjectsFields(i) {
    return (this.portfolioSignIn.get('projects') as FormArray).removeAt(i);
  }
  addProjectDescription(i) {
    const control = new FormControl(null, [Validators.required]);
    (<FormArray>this.portfolioSignIn.controls.projects['controls'][i]['controls'].projectDescription).push(control);
  }
  addExperienceDescription(i) {
    const control = new FormControl(null, [Validators.required]);
    (<FormArray>this.portfolioSignIn.controls.timelineDataExperience['controls'][i]['controls'].description).push(control);
  }
  removeProjectDescription(i, k) {
    return (this.portfolioSignIn.controls.projects['controls'][i]['controls'].projectDescription as FormArray).removeAt(k);
  }
  removeExperienceDescription(i, j) {
    return (this.portfolioSignIn.controls.timelineDataExperience['controls'][i]['controls'].description as FormArray).removeAt(j);
  }
}
