import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-user',
  templateUrl: './log-user.component.html',
  styleUrls: ['./log-user.component.css']
})
export class LogUserComponent {

  constructor(private formbuilder: FormBuilder, private auth: AuthService, private router: Router){}

  form: FormGroup = this.formbuilder.group({
    username:['',Validators.required],
    password:['',Validators.required]
  })

  login(){
    if (this.form.invalid) return;
    this.auth.verficaUserAndPass(
      this.form.controls['username'].value,
      this.form.controls['password'].value
    )
  }

}
