import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {
  showExperienceCurrentTo: boolean = true;
  portfolioSignIn: FormGroup;
  maxiDate: any;
  minDate: any;
  editModule = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['code-block'],

      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],

      [{ script: 'sub' }, { script: 'super' }],

      ['clean'],
    ]
  };
  constructor(private router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.portfolioSignIn = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required]),
      designation: new FormControl(null, [Validators.required]),
      about: new FormControl(null, [Validators.required]),
      phoneNumber: new FormArray([new FormControl(null, [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')])]),
      email: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      timelineDataEducation: new FormArray([this.initTimelineDataEducation()]),
      projects: new FormArray([this.initProjects()]),
      isExperience: new FormControl(false),
    });
    this.maxiDate = this.getMaximumDate();
  }
  getMaximumDate() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }
  initTimelineDataExperience(): FormGroup {
    return new FormGroup({
      duration: new FormGroup({
        durationFrom: new FormControl(null, [Validators.required]),
        durationTo: new FormControl({ value: null, disabled: true })
      }),
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
      year: new FormControl(null, [Validators.required, Validators.pattern('^[12][0-9]{3}$')]),
      course: new FormControl(null, [Validators.required]),
      name_of_institute: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required]),
      result: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern('^((100)|([0-9]{1,2}(.[0-9]{1,2})?))$')])
    })
  }
  addPhoneNumber() {
    const control = new FormControl(null, [Validators.required]);
    (<FormArray>this.portfolioSignIn.get('phoneNumber')).push(control);
  }

  onSubmit() {
    localStorage.setItem('portfolioDetails', JSON.stringify(this.portfolioSignIn.value));
    console.log(this.portfolioSignIn.value);
    console.log(this.portfolioSignIn);
    this.router.navigate(['home']);
  }
  removePhoneNumber(i) {
    return (this.portfolioSignIn.get('phoneNumber') as FormArray).removeAt(i);
  }
  toggleIsExperience() {
    this.showExperienceCurrentTo = true;
    if (this.portfolioSignIn.get('isExperience').value) {
      this.portfolioSignIn.addControl('timelineDataExperience', new FormArray([this.initTimelineDataExperience()]));
    } else {
      this.portfolioSignIn.removeControl('timelineDataExperience');
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
  onDurationFromChange(event, i) {
    const durationTo = this.portfolioSignIn.controls.timelineDataExperience['controls'][i]['controls'].duration['controls'].durationTo;
    const durationFrom = this.portfolioSignIn.controls.timelineDataExperience['controls'][i]['controls'].duration['controls'].durationFrom;
    this.minDate = durationFrom.value;
    if (durationFrom.value && this.showExperienceCurrentTo) {
      durationTo.enable();
      durationTo.setValidators([Validators.required]);
    } else {
      durationTo.disable();
      durationTo.clearValidators();
    }
    durationTo.updateValueAndValidity();
  }

  onChangeCurrentlyWorking(event, i) {
    console.log(event.target.checked);
    const durationTo = this.portfolioSignIn.controls.timelineDataExperience['controls'][i]['controls'].duration['controls'].durationTo;
    const durationFrom = this.portfolioSignIn.controls.timelineDataExperience['controls'][i]['controls'].duration['controls'].durationFrom;
    if (event.target.checked) {
      this.showExperienceCurrentTo = false;
      durationTo.clearValidators();
    }
    else if (!durationFrom.value && !event.target.checked) {
      this.showExperienceCurrentTo = true;
      durationTo.disable();
      durationTo.clearValidators();
    } else if (durationFrom.value && !event.target.checked) {
      this.showExperienceCurrentTo = true;
      durationTo.enable();
      durationTo.setValidators([Validators.required]);
    }
    durationTo.updateValueAndValidity();
  }
}
