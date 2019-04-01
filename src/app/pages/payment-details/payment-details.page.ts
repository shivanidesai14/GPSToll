import { Component, OnInit } from "@angular/core";

import { PaymentdetailsService } from "../../providers/paymentdetailsdb/paymentdetails.service";

import { PaymentDetais } from "../../shared/paymentdetails";

import { PaymentMethod } from "../../shared/paymentmethod_class";

import { PaymentmethodService } from "../../providers/paymentmethoddb/paymentmethod.service";
import { Router } from "@angular/router";

import { NavigationExtras } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-payment-details",
  templateUrl: "./payment-details.page.html",
  styleUrls: ["./payment-details.page.scss"]
})
export class PaymentDetailsPage implements OnInit {
  cname: string = "";
  cno: number = 0;
  exm: number = 0;
  exy: number = 0;
  uemail: string = "";
  id: number = 0;
  mid: number = 0;
  paydetail: PaymentDetais[] = [];
  paydet: PaymentDetais[] = [];
  mname: string = "";
  paym: PaymentMethod[] = [];
  vno: any;
  vehicle_no: any;

  payment_type: any;

  card_details: FormGroup;

  constructor(
    public payd: PaymentdetailsService,
    public paymeth: PaymentmethodService,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.vno = this.router.getCurrentNavigation().extras.state.prev_vehicle_no;
    }
    console.log(this.vno);
  }

  ngOnInit() {
    this.id = parseInt(localStorage.getItem("id"));
    this.mid = parseInt(localStorage.getItem("mid"));
    console.log(this.id);
    console.log(this.mid);

    this.card_details = new FormGroup({
      holder_name: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.maxLength(15)])
      ),
      card_no: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16)
        ])
      ),
      card_name: new FormControl(
        Validators.compose([Validators.required, Validators.maxLength(15)])
      ),
      expire_month: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      expire_year: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      cvv: new FormControl("", Validators.required)
    });

    this.mname = localStorage.getItem("mname");
    this.payd.getAllPaymentDetailsByUser(this.id).subscribe(
      (data: any[]) => {
        console.log("in");
        this.paydetail = data;
        console.log(data);
      },
      function(error) {
        console.log(error);
      },
      function() {
        console.log("complete");
      }
    );
  }
  getVehicleNo() {
    console.log("in");
    let navigationExtras: NavigationExtras = {
      state: {
        prev_vehicle_no: this.vno
      }
    };
    console.log(navigationExtras);
    this.router.navigateByUrl("/view-payment-method", navigationExtras);
  }
  onRadioChange(p_id) {
    this.payment_type = p_id;
    console.log(this.payment_type);
    let navigationExtras: NavigationExtras = {
      state: {
        prev_vehicle_no: this.vno
      }
    };
    console.log(navigationExtras);
    this.router.navigateByUrl("/confirm-payment", navigationExtras);
  }
}
