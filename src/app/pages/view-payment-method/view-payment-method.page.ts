import { Component, OnInit } from "@angular/core";
import { PaymentMethodsService } from "src/app/providers/payment-methods-db/payment-methods.service";
import { paymentMethodsUser } from "src/app/shared/user_payment_methods";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import { paymentMethodClass } from "src/app/shared/payment_method_class";
import { AlertController, ToastController } from "@ionic/angular";

@Component({
  selector: "app-view-payment-method",
  templateUrl: "./view-payment-method.page.html",
  styleUrls: ["./view-payment-method.page.scss"]
})
export class ViewPaymentMethodPage implements OnInit {
  payment_methods: paymentMethodsUser[] = [];
  visited: boolean = false;
  paymentMethod: paymentMethodsUser = null;
  uid: any;

  showList: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private user_payment_method_db: PaymentMethodsService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.paymentMethod = this.router.getCurrentNavigation().extras.state.user;
        // this.payment_method = new paymentMethodClass(this.paymentMethod.method_id, this.paymentMethod.method_name);
        // console.log(this.payment_method);
      }
    });
    // console.log("this executed");
  }

  async ngOnInit() {
    this.uid = localStorage.getItem("id");

    this.user_payment_method_db.getAllPaymentByUid(this.uid).subscribe(
      (data: paymentMethodsUser[]) => {
        this.payment_methods = data;
        this.visited = true;
        if (this.payment_methods.length == 0) {
          this.showList = true;
        }
      },
      err => {
        console.log(err);
      },
      () => {
      }
    );
  }

  ionViewDidEnter() {
    /* if (this.visited) this.ngOnInit(); */
  }

  async editPayment(item: paymentMethodsUser) {
    let navigationExtras: NavigationExtras = {
      state: {
        user: item
      }
    };
    this.router.navigateByUrl("/edit-payment-details", navigationExtras);
  }

  /* async onDeleteCard(payment_id) {
    console.log("hell" + payment_id);
    const confirmBox = await this.alertController.create({
      header: "Confirm!",
      message: "Are you sure you want to delete this Card?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary"
        },
        {
          text: "Yes",
          handler: () => {
            this.user_payment_method_db
              .deletePaymentMethod(payment_id)
              .subscribe(
                (data: any) => {
                  console.log(data);
                  this.ngOnInit();
                },
                err => {
                  alert("Card could not be deleted");
                },
                () => {}
              );
          }
        }
      ]
    });
    confirmBox.present();
  } */
}
