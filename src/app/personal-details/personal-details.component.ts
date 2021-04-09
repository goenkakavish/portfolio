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
        phoneNumber: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required])
      })
    }
    // addPhoneNumber() {
    //   const control = this.portfolioSignIn.get('phoneNumber') as FormArray;
    //   control.push(new FormControl());
    // }
  
    onSubmit() {
      this.dataShareService.personalDetails.next(this.portfolioSignIn.value)
      this.router.navigate(['home']);
    }

}
