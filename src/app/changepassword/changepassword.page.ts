import { Md5 } from 'ts-md5/dist/md5';
import { paymentMethodsUser } from './../shared/user_payment_methods';
import { UserserviceService } from 'src/app/providers/userDB/userservice.service';
import { FormControl, Validators, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { user } from '../shared/user_class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  myform: FormGroup;
  us: user;
  oldpass: string;
  newpass: string;
  hashed: any;
  id: any;
  confpass: string;
  constructor(public data: UserserviceService, public md5: Md5, public router: Router) {
    this.myform = new FormGroup({
      oldpass: new FormControl('',{
        validators:[Validators.required, Validators.pattern("^([A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")],updateOn:'blur'
      }),
      newpass: new FormControl('', {
        validators:[Validators.required, Validators.pattern("^([A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")],updateOn:'blur'
      }),
      confpass: new FormControl('', {
        validators:[Validators.required, Validators.pattern("^([A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")]
        ,updateOn:'blur'
      }   )
    });
  }

  ngOnInit() {
    this.id = localStorage.getItem('id');
    this.data.getUserById(this.id).subscribe(
      (u: any) => {
        console.log(u);
        this.us = u;
        //this.us = u[0];
      },
      (err) => {
        console.log(err);
      },
      () => {

      });
  }
  ChangePassword() {
    console.log(this.oldpass + " " + this.newpass + " " + this.confpass);
    this.us.user_password=this.md5.appendStr(this.oldpass).end().toString();
    console.log(this.md5.appendStr(this.oldpass).end().toString());
    console.log(this.us);
    this.data.userlogin(this.us).subscribe(
      (data: any) => {
        alert("Authenticated");
        this.hashed = this.md5.appendStr(this.newpass).end();
        console.log(this.hashed);
        this.data.changePassword(this.hashed, localStorage.getItem('id')).subscribe(
          (data: any) => {
            alert("Password Changed");
            this.router.navigate(['/my-profile']);
          }
        );
      },
      function (err) {
        alert("Error in Verifying Old Password");
      }
    );

  }

}
