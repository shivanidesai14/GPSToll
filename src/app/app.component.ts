import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";

import {
  Platform,
  MenuController,
  IonRouterOutlet,
  ModalController,
  ToastController,
  NavController,
  AlertController
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router, RouterEvent, NavigationEnd } from "@angular/router";
import { async } from "q";
import { PermissionsService } from "./providers/background-geo-location/permissions.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private perm: PermissionsService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();
    this.backButtonEnable();
    this.perm.checkGPSPermission();
  }

  ngOnInit() {}

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.splashScreen.hide();
    });
  }

  backButtonEnable() {
    this.platform.backButton.subscribe(async () => {
      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
        if (
          this.router.url === "/home" ||
          this.router.url === "/login" ||
          this.router.url === ""
        ) {
          this.presentConfirm();
        }
      });
    });
  }

  onLogout() {
    localStorage.clear();
    this.navCtrl.navigateRoot(["/login"]);
  }

  async presentConfirm() {
    const alert = await this.alertCtrl.create({
      header: "Confirm Exit",
      message: "Do you want Exit?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Yes",
          handler: () => {
            console.log("Yes clicked");
            navigator["app"].exitApp();
          }
        }
      ]
    });
    alert.present();
  }
}
