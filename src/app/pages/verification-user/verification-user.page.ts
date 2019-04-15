import { Component, OnInit } from '@angular/core';

import { UserserviceService } from "../../providers/userDB/userservice.service";
import { MenuController, ToastController } from '@ionic/angular';
import { user } from "../../shared/user_class";
import { Router } from '@angular/router';
import { async } from 'q';


@Component({
  selector: 'app-verification-user',
  templateUrl: './verification-user.page.html',
  styleUrls: ['./verification-user.page.scss'],
})
export class VerificationUserPage implements OnInit {

  user_input: string;
  user: user[] = [];
  id: any;
  mail: any;
  flag: boolean;

  constructor(public Users: UserserviceService, public router: Router,private toast:ToastController) { }

  ngOnInit() {

    this.mail = localStorage.getItem('mail');
    

    

    var x = localStorage.getItem('flag');
    if (x === "true") {
      localStorage.setItem('flag',"false");
      this.flag = true;
    } else {
      this.flag = false;
    }
  }
   async verify_user() {
    const tos = await this.toast.create({
      message: "Succesfully Registerd",
      duration: 5000,
      position: "bottom",
      cssClass: "toast_login_fail",
      translucent: true,
      animated: true,
      
    });
    console.log(this.user_input);
  await this.Users.user_verify(this.user_input, this.mail).subscribe(
      (data: { result:any }) => {
          console.log(data.result + "data result");
        if (data.result == "true" ) {
         tos.present();
          this.router.navigate(['/login']);
        } else {
          console.log('not valid'); 

        }
      },
      function (err) {
        console.log(err);
      },
      function () {

      }
    );

  }
 async resend() {
  const tos1 = await this.toast.create({
    message: "Succesfully Mail Sent",
    duration: 5000,
    position: "bottom",
    cssClass: "toast_login",
    translucent: true,
    animated: true,
    
  });
    this.mail = localStorage.getItem('mail');
    console.log(this.mail);
    this.Users.resend(new user(null,null,null,this.mail,null,null,null)).subscribe(
      (data:any[])=>{
        tos1.present();
      },
      function(err)
      {
          console.log(err);
      },
      function()
      {

      }
    );
  }
}
