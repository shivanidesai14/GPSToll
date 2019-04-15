import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams, ToastController } from "@ionic/angular";
import { vehicleTypeProvider } from "src/app/providers/vehicledb/vehicleType";
import { vehicleType } from "src/app/providers/classes/classVehicleType";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { VehicledbProvider } from "src/app/providers/vehicledb/vehicledb";
import { vehicle } from "src/app/providers/classes/classVehicle";
import { VehicleClass } from "src/app/shared/vehicle_class";

@Component({
  selector: "app-add-vehicle-model",
  templateUrl: "./add-vehicle-model.page.html",
  styleUrls: ["./add-vehicle-model.page.scss"]
})
export class AddVehicleModelPage implements OnInit {
  para: number;

  add_vehicle_form: FormGroup;
  vehicle_no: any;
  vehicle_type_id: number;
  uid: any;

  vehicle_type: vehicleType[] = [];

  constructor(
    private modelCtrl: ModalController,
    private navParams: NavParams,
    private _vehicletype: vehicleTypeProvider,
    private _vehicles: VehicledbProvider,
    private formBuilder: FormBuilder,
    private toastController: ToastController
  ) {
    this._vehicletype.getAllVehicleType().subscribe(
      (data: any) => {

        this.vehicle_type = data;
        this.add_vehicle_form = new FormGroup({
          vehicle_no: new FormControl(
            "",
            Validators.compose([
              Validators.minLength(13),
              Validators.maxLength(13),
              Validators.required
            ])
          ),
          vehicle_type_name: new FormControl("", Validators.required)
        });
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("vehicle types loaded");
      }
    );
  }

  validation_messages = {
    vehicle_no: [
      { type: "required", message: "Vehicle No is required" },
      {
        type: "minlength",
        message: "Vehicle no is at least 13 characters long."
      },
      {
        type: "maxlength",
        message: "Vehicle no can not be more than 13 charaters long."
      }
    ],
    vehicle_type_name: [
      { type: "required", message: "Vehicle Type Name is required" }
    ]
  };

  ngOnInit() {
    this.uid = localStorage.getItem("id");

    this.add_vehicle_form = new FormGroup({
      vehicle_no: new FormControl(
        "",
        Validators.compose([
          Validators.minLength(13),
          Validators.maxLength(13),
          Validators.required
        ])
      ),
      vehicle_type_name: new FormControl("", Validators.required)
    });

    this.para = this.navParams.get("value");
    console.log(this.para);
  }

  async done() {
    const toast = await this.toastController.create({
      message: "New Vehicle added successfully",
      showCloseButton: true,
      position: "top",
      closeButtonText: "Done"
    });
    this._vehicles
      .addVehicle(
        new VehicleClass(this.vehicle_no, this.vehicle_type_id, this.uid)
      )
      .subscribe(
        async (data: any) => {
          await this.modelCtrl.dismiss(
            new VehicleClass(this.vehicle_no, this.vehicle_type_id, this.uid)
          );
        },
        err => {
          console.log(err);
        },
        () => {
          toast.present();
        }
      );
  }

  cancel() {
    this.modelCtrl.dismiss();
  }
}
