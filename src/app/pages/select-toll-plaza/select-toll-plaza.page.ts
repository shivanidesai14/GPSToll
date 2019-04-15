import { Component, OnInit } from "@angular/core";
import { TollplazaService } from "../../providers/tollplazadb/tollplaza.service";

import { Tollplazza } from "../../shared/tollplaza_class";
import { vehicleType } from "../../providers/classes/classVehicleType";
import { vehicleTypeProvider } from "../../providers/vehicledb/vehicleType";
import { NavigationExtras, Router, ActivatedRoute } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";

class Port {
  public id: number;
  public name: string;
}
@Component({
  selector: "app-select-toll-plaza",
  templateUrl: "./select-toll-plaza.page.html",
  styleUrls: ["./select-toll-plaza.page.scss"]
})
export class SelectTollPlazaPage implements OnInit {
  ports: Port[];
  port: Port;
  tp: Tollplazza[] = [];
  totalAmount: number = 0;
  tollplazas: number[] = [];
  whichJ: any;
  whichV: any;
  vehicle_type: any;
  typevehic: vehicleType[] = [];
  amt: number = 0;
  selectedTollPlaza: Tollplazza[] = [];
  private isDisabled: Boolean = false;
  vehicle: string;
  vehicleselect: boolean = true;
  journey: boolean = true;
  plaza: boolean = true;
  vtid: any;
  id = 0;
  amounts: number[] = [];
  tid: number[] = [];
  tollpid: number;
  final_tollplaza: Tollplazza[] = [];
  select_toll_plaza: FormGroup;
  constructor(
    public tpdata: TollplazaService,
    public activateroute: ActivatedRoute,
    public vtdata: vehicleTypeProvider,
    public router: Router,
    private formBuilder: FormBuilder
  ) {
    this.activateroute.params.subscribe((data: any) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.tid = this.router.getCurrentNavigation().extras.state.plazaids;
        this.final_tollplaza = this.router.getCurrentNavigation().extras.state.finalplaza;
      }
    });
    this.select_toll_plaza = new FormGroup({
      journey: new FormControl("", Validators.required),
      vehicle_type: new FormControl("", Validators.required),
      amt: new FormControl()
    });
  }

  ngOnInit() {}
  OnInit() {
    this.vtdata.getAllVehicleType().subscribe((data: vehicleType[]) => {
      if (this.vehicle == "two_wheeler") {
        this.vtid = data[0].vehicle_type_id;
      } else {
        console.log("error");
      }
    });
  }
  //Below All Function Made for button Diasable Till PlazaSelect
  journeyselect() {
    this.journey = false;
  }
  onSelectVehicle() {
    this.vehicleselect = false;
  }
  plazaSelect() {
    this.plaza = false;
  }
  //It will give id of vehicle Type
  getId(num) {
    this.vtid = num;
  }
  //it will send params on next page
  onVehicle() {
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.tid,
        amounts: this.amounts,
        finalplaza: this.final_tollplaza
      }
    };
    this.router.navigate(
      [
        "/add-vehicle-details",
        {
          prev_vehicle_type: this.id,
          prev_amt: this.totalAmount,
          prev_journey: this.whichJ,
          prev_tid: this.tollpid
        }
      ],
      navigationExtras
    );
  }
  //For get vehicleid
  anotherMyAmountChange() {
    if (this.vehicle != "") {
      if (this.vehicle == "two_wheeler") {
        this.id = 1;
      } else if (this.vehicle == "four_wheeler") {
        this.id = 2;
      } else if (this.vehicle == "bus") {
        this.id = 3;
      } else if (this.vehicle == "truck") {
        this.id = 4;
      } else if (this.vehicle == "moster") {
        this.id = 5;
      } else if (this.vehicle == "six_wheeler") {
        this.id = 6;
      }
    }
    this.myAmountChange();
  }
  //for get price of selected toll
  myAmountChange() {
    if (
      this.vehicle !== "" &&
      this.vehicle != null &&
      this.whichJ !== "" &&
      this.whichJ != null
    ) {
      this.totalAmount = 0;
      var i = 0;
      this.amt = 0;
      for (var i = 0; i < this.final_tollplaza.length; i++) {
        if (this.vehicle === "two_wheeler" && this.whichJ === "single") {
          this.amt = this.final_tollplaza[i].two_wheeler_one;
        } else if (this.vehicle === "two_wheeler" && this.whichJ === "return") {
          this.amt = this.final_tollplaza[i].two_wheeler_return;
        } else if (
          this.vehicle === "four_wheeler" &&
          this.whichJ === "single"
        ) {
          this.amt = this.final_tollplaza[i].four_wheeler_one;
        } else if (
          this.vehicle === "four_wheeler" &&
          this.whichJ === "return"
        ) {
          this.amt = this.final_tollplaza[i].four_wheeler_return;
        } else if (this.vehicle === "bus" && this.whichJ === "single") {
          this.amt = this.final_tollplaza[i].bus_one;
        } else if (this.vehicle === "bus" && this.whichJ === "return") {
          this.amt = this.final_tollplaza[i].bus_return;
        } else if (this.vehicle === "truck" && this.whichJ === "single") {
          this.amt = this.final_tollplaza[i].truck_one;
        } else if (this.vehicle === "truck" && this.whichJ === "return") {
          this.amt = this.final_tollplaza[i].truck_return;
        } else if (this.vehicle === "monster" && this.whichJ === "single") {
          this.amt = this.final_tollplaza[i].HCM_one;
        } else if (this.vehicle === "monster" && this.whichJ === "return") {
          this.amt = this.final_tollplaza[i].HCM_return;
        } else if (this.vehicle === "six_wheeler" && this.whichJ === "single") {
          this.amt = this.final_tollplaza[i].six_wheeler_one;
        } else if (this.vehicle === "six_wheeler" && this.whichJ === "return") {
          this.amt = this.final_tollplaza[i].six_wheeler_return;
        } else {
        }
        this.amounts[i] = this.amt;
        this.totalAmount = this.amt + this.totalAmount;
      }
    } else {
      this.totalAmount = 0;
    }
  }
}
