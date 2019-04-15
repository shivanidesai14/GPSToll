import { Component, OnInit } from "@angular/core";
import { UserserviceService } from "../../providers/userDB/userservice.service";
import { user } from "../../shared/user_class";
import { async } from '@angular/core/testing';
import { convertToR3QueryMetadata } from '@angular/core/src/render3/jit/directive';
import { Router } from "@angular/router";
import { Md5 } from "ts-md5";
import { ToastController, LoadingController } from "@ionic/angular";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
@Component({
  selector: "app-forgetpassword",
  templateUrl: "./forgetpassword.page.html",
  styleUrls: ["./forgetpassword.page.scss"]
})


export class ForgetpasswordPage implements OnInit {
  email: string;
  user_input: string;
  value1: boolean = false;
  pass: string;
  pass1: string;
  value2: boolean = true;
  value3: boolean = false;
  myform: FormGroup;
  constructor(public userservice: UserserviceService, myform: FormGroup,
    private md5: Md5,
    public router: Router,
    public toast: ToastController,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController
  ) {
    this.myform = new FormGroup({
      pass: new FormControl('', {
        validators: [Validators.required, Validators.pattern("^([A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")], updateOn: 'blur'
      }),
      pass1: new FormControl('', {
        validators: [Validators.required, Validators.pattern("^([A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")], updateOn: 'blur'
      }),
      email: new FormControl("", {
        validators: [
          Validators.required,
          Validators.pattern(".+@.+..+"),
          Validators.email
        ]
      })
    });
  }

  ngOnInit() {
  }
  async send() {
    var string = '0123456789abcdefghijklmnopqrtuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var len = string.length;
    var otpp = '';
    for (let i = 0; i < 4; i++) {
      otpp += string[Math.floor(Math.random() * len)];
    }

    const loading = await this.loadingController.create({
      message: "Sending Mail",
      spinner: "bubbles"
    });
    loading.present();

    const t1 = await this.toast.create({
      message: "OTP send",
      duration: 5000,
      position: "bottom",
      cssClass: "toast_mail",
      translucent: true,
      animated: true
    });
    const t2 = await this.toast.create({
      message: "Email Is Invalid",
      duration: 5000,
      position: "bottom",
      cssClass: "toast_login",
      translucent: true,
      animated: true
    });

    const md5 = new Md5();


    this.userservice.getUserByEmail(this.email).subscribe(
      (data: user[]) => {
        this.userservice.resend(new user(null, null, null, this.email, null, null, null)).subscribe(
          (data: any) => {

            t1.present();
            this.value1 = true;
          },
          function (err) {

          },
          function () {

          }
        );

      });

  }
  async  submit1() {
    var t5 = await this.toast.create({
      message: "OTP is not Valid",
      duration: 5000,
      position: "bottom",
      cssClass: "toast_login",
      translucent: true,
      animated: true

    }
    );
    this.userservice.user_verify(this.user_input, this.email).subscribe(
      (data: { result: string }) => {
        if (data.result == "true") {
          this.value1 = false;
          this.value2 = false;
          this.value3 = true;
          console.log(data.result);
        }
        else {
          t5.present();
        }
      }
    );
  }
  async change() {
    const t3 = await this.toast.create({
      message: "Password Changed successfully",
      duration: 5000,
      position: "bottom",
      cssClass: "toast_login",
      translucent: true,
      animated: true
    });
    const t4 = await this.toast.create({
      message: "password and conform password is not same",
      duration: 5000,
      position: "bottom",
      cssClass: "toast_login",
      translucent: true,
      animated: true
    });
    if (this.pass === this.pass1) {
      var hashedPassword = this.md5.appendStr(this.pass1).end().toString();
      this.userservice.changePassword(hashedPassword, this.email).subscribe(
        (data: any[]) => {
          t3.present();
          this.router.navigate(['/login']);
        },
        function (err) {

        },
        function () {

        }
      );
    }
    else {
      t4.present();
    }
  }
}
