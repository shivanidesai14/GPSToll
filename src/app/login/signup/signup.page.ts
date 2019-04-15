import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import { user } from "../../shared/user_class";
import {
  MenuController,
  ToastController,
  LoadingController
} from "@ionic/angular";
import { UserserviceService } from "../../providers/userDB/userservice.service";
import { Md5 } from "ts-md5/dist/md5";
import { Router } from "@angular/router";
import { logging } from "protractor";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"]
})
export class SignupPage implements OnInit {
  name: string;
  password1: string;
  email: string;
  contact1: string;
  myform: FormGroup;
  s: string = Math.floor(Math.random() * Math.floor(999999)).toString();
  temp_user: user[] = [];
  private flag = 0;
  constructor(
    public userservice: UserserviceService,
    private MD5: Md5,
    private router: Router,
    private toast: ToastController,
    private loadingController: LoadingController
  ) {
    /* constructor(public userservice: UserserviceService,private MD5:Md5) { */

    this.myform = new FormGroup({
      name: new FormControl("", {
        validators: [Validators.required, Validators.pattern("[a-zA-Z ]*$")],
        updateOn: "blur"
      }),
      password1: new FormControl("", {
        validators: [
          Validators.required,
          Validators.pattern("^([A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")
        ],
        updateOn: "blur"
      }),
      email: new FormControl("", {
        validators: [
          Validators.required,
          Validators.pattern(".+@.+..+"),
          Validators.email,
          this.EmailExsitCustomValidation.bind(this)
        ],
        updateOn: "blur"
      }),
      contact1: new FormControl("", {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern("^[0-9]+")
        ],
        updateOn: "blur"
      })
    });
  }

  async onsignup() {
    const tos2 = await this.toast.create({
      message: " We Sent You a OTP Check Your Registered Mail",
      duration: 5000,
      position: "bottom",
      cssClass: "toast_login_fail",
      translucent: true,
      animated: true
    });
    const tos1 = await this.toast.create({
      message: "EMail is Not Valid",
      duration: 5000,
      position: "bottom",
      cssClass: "toast_login_fail",
      translucent: true,
      animated: true
    });
    const loading = await this.loadingController.create({
      message: "Redirecting ...",
      showBackdrop: true,
      id: "login"
    });
    const md5 = new Md5();
    // const ls=md5.appendStr("hellohellohello").end();
    var hashedPassword = md5.appendStr(this.password1).end();
    loading.present();
    this.userservice
      .emailsend(
        new user(
          null,
          this.name,
          hashedPassword.toString(),
          this.email,
          this.contact1,
          null,
          0
        )
      )
      .subscribe(
        (data: any[]) => {
          localStorage.setItem("mail", this.email);
          loading.dismiss();
          tos2.present();
          this.router.navigate(["/verification-user"]);
        },
        function(error) {
          loading.dismiss();
          tos1.present();
        }
      );
  }

  ngOnInit() {}
  EmailExsitCustomValidation(
    control: AbstractControl
  ): { [s: string]: boolean } {
    if (control.value != null) {
      this.userservice.getUserByEmail(control.value).subscribe(
        (data: user[]) => {
          this.temp_user = data;
          if (this.temp_user.length !== 0 && this.myform.get("email").touched) {
            this.myform.get("email").setErrors({ EmailAlreadyExsits: true });
            this.flag = 1;
          }
        },
        function(err) {
          this.myform.get("email").setErrors({ EmailAlreadyExsits: false });
        },
        function() {}
      );
      return null;
    }
  }
}
