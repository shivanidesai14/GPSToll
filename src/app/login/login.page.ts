import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  MenuController,
  ToastController,
  LoadingController
} from "@ionic/angular";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { user } from "../shared/user_class";
import { UserserviceService } from "../providers/userDB/userservice.service";
import { Md5 } from "ts-md5";
import { removeDebugNodeFromIndex } from "@angular/core/src/debug/debug_node";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit, OnDestroy {
  email: string;
  password1: string;
  loginform: FormGroup;
  id: any;
  mail: string;
  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private userservice: UserserviceService,
    private toast: ToastController,
    private md5: Md5,
    private loadingController: LoadingController
  ) {
    this.loginform = new FormGroup({
      password1: new FormControl("", {
        validators: [Validators.required, Validators.minLength(6)],
        updateOn: "blur"
      }),
      email: new FormControl("", {
        validators: [
          Validators.required,
          Validators.pattern(".+@.+..+"),
          Validators.email
        ],
        updateOn: "blur"
      })
    });
  }
  ngOnInit() {
    this.email = "";
    this.password1 = "";
    this.menuCtrl.enable(false);
  }

  async onlogin() {
    const tos = await this.toast.create({
      message: "User Login Successfully",
      duration: 5000,
      position: "bottom",
      cssClass: "toast-login",
      translucent: true,
      animated: true
    });
    const tos1 = await this.toast.create({
      message: "Email Or Password incorrect Or Email Is Not Verified",
      duration: 5000,
      position: "bottom",
      cssClass: "toast_login_fail",
      translucent: true,
      animated: true
    });
    const tos2 = await this.toast.create({
      message:
        "Email Is Not Verified, We Sent You a OTP Check Your Registered Mail",
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
    var hashedPassword = md5.appendStr(this.password1).end();

    this.userservice
      .userlogin(
        new user(null, "", hashedPassword.toString(), this.email, "", null, 0)
      )
      .subscribe(
        (data: user[]) => {
          if (data.length > 0) {
            if (data[0].verify == 1) {
              this.id = data[0].user_id;
              localStorage.setItem("id", this.id);
              localStorage.setItem("name", data[0].user_name);

              tos.present();
              console.log("verifird");
              this.router.navigate(["/home"]);
            } else {
              localStorage.setItem("flag", "true");
              localStorage.setItem("mail", this.email);
              console.log("not verifird");
              loading.present();
              tos2.present();
              this.userservice
                .resend(
                  new user(null, null, null, this.email, null, null, null)
                )
                .subscribe(
                  (data: any[]) => {
                    loading.dismiss();
                    this.router.navigate(["/verification-user"]);
                  },
                  function(err) {
                    console.log(err);
                  },
                  function() {}
                );
            }
          } else {
            console.log("");
            tos1.present();
          }
        },
        function(error) {},
        function() {}
      );
  }

  forgetpassword() {
    this.router.navigate(["/forgetpassword"]);
  }
  ngOnDestroy() {
    this.menuCtrl.enable(true);
  }
}
