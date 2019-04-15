import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { user } from "../../shared/user_class";
import { User } from "../classes/classUser";
import { user_mail } from "../../shared/user_mail";
import { Response, RequestOptions, Headers } from "@angular/http";

@Injectable({
  providedIn: "root"
})
export class UserserviceService {
  private urllogin: string = "http://tollproject.herokuapp.com/userlogin/";
  private url: string = "http://tollproject.herokuapp.com/userss/";
  private url_mail = "http://tollproject.herokuapp.com/mail/";
  private url_password_update ="http://tollproject.herokuapp.com/userpassword/";
  private url_verify = "http://tollproject.herokuapp.com/verifyuser/";
  private url_resend = "http://tollproject.herokuapp.com/resendotp/";
  private urltranactionuser = "http://tollproject.herokuapp.com/transactionuser/";

  private user: user[] = [];

  constructor(public http: HttpClient) {}
  userlogin(user: user) {
    // return this._http.post(this.user,body,);
    const body = JSON.stringify(user);
    return this.http.post(this.urllogin, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }
  GetAllUser(email) {
    return this.http.get(this.urllogin + email);
  }
  usersignup(user: user) {
    const body = JSON.stringify(user);
    return this.http.post(this.url, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }

  updateUser(us: user) {
    const body = JSON.stringify(us);
    return this.http.put(this.urllogin, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }
  changePassword(newpass: string, id: any) {
    console.log(newpass,id);
    return this.http.put(this.url + newpass + "/" + id, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }
  getTransactionByUserId(id: any) {
    return this.http.get(this.urltranactionuser + id);
  }

  user_Email(user: user_mail) {
    const body = JSON.stringify(user);
    return this.http.post(this.url_mail, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }
  getUserByEmail(email: any) {
    return this.http.get(this.urllogin + email);
  }
  user_verify_update(mail: any) {
    const body = JSON.stringify(user);
    return this.http.post(this.url_mail + mail, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }
  user_update_password(mail: any, user: any) {
    const body = JSON.stringify(user);
    return this.http.put(this.url_password_update + mail, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }
  user_verify(otp: any, email: any) {
    console.log(otp,email);
    return this.http.get(this.url_verify + otp + "/" + email);
  }
  emailsend(user: any) {
    const body = JSON.stringify(user);
    return this.http.post(this.url, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }
  resend(user: any) {
    const body = JSON.stringify(user);
    return this.http.post(this.url_resend, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }
  getUserById(id: any) {
    return this.http.get(this.url + id);
  }
}
