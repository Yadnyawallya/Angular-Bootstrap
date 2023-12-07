import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public LoginForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.LoginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.http.get<any>("http://localhost:3000/SignupUsers/")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.LoginForm.value.email && a.password === this.LoginForm.value.password
        });
        if (user) {
          alert("Login success");
          this.LoginForm.reset();
          this.router.navigate(['dashboard'])
        } else {
          alert("user not found");
        }
      },err=>{
        alert("something went wrong");
      })
  }

}
