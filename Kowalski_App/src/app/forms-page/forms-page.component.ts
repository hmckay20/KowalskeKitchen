import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as emailjs from 'emailjs-com';
@Component({
  selector: 'app-form-page',
  templateUrl: './forms-page.component.html',
  styleUrls: ['./forms-page.component.scss']
})

export class FormPageComponent implements OnInit {
  form: FormGroup;
  
  constructor() {
    this.form = new FormGroup({});
}
isSubmitted = false;
progressWidth = '0%';
ngOnInit() {
  
  this.form = new FormGroup({
    'firstName': new FormControl(null, Validators.required),
    'lastName': new FormControl(null, Validators.required),
   // 'name': new FormControl(null, Validators.required),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'feedback': new FormControl(null, Validators.required),
    'experience': new FormControl(null, Validators.required)
  });
}

onSubmit() {
  
  const templateParams = {
    to_name: this.form.value.firstName + " " + this.form.value.lastName,
    from_email: this.form.value.email,
    message: this.form.value.feedback,

  };
  console.log(templateParams);

  emailjs.send('service_v5xpdxf', 'template_bw1e0ej', templateParams, 'RUROIElQksddbB8x7')
  .then((response) => {
     console.log('Email successfully sent!', response);
     this.progressWidth = '33%';
     this.isSubmitted = true;
  })
  .catch((err) => {
     console.error('Failed to send email:', err);
  });
}
}
