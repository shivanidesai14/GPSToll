import { ToastController } from '@ionic/angular';
import { Md5 } from 'ts-md5';
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
  dbPassword: string;
  
  constructor(public data: UserserviceService, public router: Router,private toast:ToastController) {
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
      (u:user[]) => {
        console.log(u);
        this.us = u[0];
        console.log(this.us);
        this.dbPassword=this.us.user_password;
        console.log(this.dbPassword);
      },
      (err) => {
        console.log(err);
      },
      () => {

      });
  }
  async ChangePassword() {
    /*console.log(this.oldpass + " " + this.newpass + " " + this.confpass);
    console.log(this.us);
    console.log("Database Password " +this.us.user_password);*/
    const md5=new Md5();
    let tmp=md5.appendStr(this.oldpass).end();
    const tos = await this.toast.create({
      message: "Invalid Old Password",
      duration: 5000,
      position: "bottom",
      cssClass: "toast_login_fail",
      translucent: true,
      animated: true
    });
    const tos1 = await this.toast.create({
      message: "Password Changed",
      duration: 5000,
      position: "bottom",
      cssClass: "toast-login",
      translucent: true,
      animated: true,
      
    });
    
    //console.log(tmp.toString()+" tmp log");
    if(this.us.user_password===tmp)
    {
       
    
        const md5=new Md5();
        let newTmp=md5.appendStr(this.newpass).end();
        //console.log(newTmp.toString+" newTmp");
        /* this.hashed = md5.appendStr(this.newpass).end();
        console.log(this.hashed.toString()+" hashed new"); */
        this.data.changePassword(newTmp.toString(), localStorage.getItem('id')).subscribe(
          (data: any) => {
            tos1.present();
            this.router.navigate(['/my-profile']);
          }
        );
      }
      else
      {
        tos.present();
      }

  }

}
