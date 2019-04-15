import { Component, OnInit } from "@angular/core";
import {
  MenuController,
  ModalController,
  AlertController,
  ToastController
} from "@ionic/angular";

import { AddVehicleModelPage } from "./add-vehicle-model/add-vehicle-model.page";
import { VehicledbProvider } from "../providers/vehicledb/vehicledb";
import { vehicle } from "../providers/classes/classVehicle";
import { vehicleTypeProvider } from "../providers/vehicledb/vehicleType";
import { vehicleType } from "../providers/classes/classVehicleType";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-my-vehicles",
  templateUrl: "./my-vehicles.page.html",
  styleUrls: ["./my-vehicles.page.scss"]
})
export class MyVehiclesPage implements OnInit {
  vehicles: vehicle[] = [];
  vehiclesDup: vehicle[] = [];
  vehicle_type: vehicleType[] = [];
  searchVehicle: FormControl;
  uid: any;

  showList: boolean = false;
  constructor(
    private menuController: MenuController,
    private alertController: AlertController,
    private modelController: ModalController,
    private _vehicle: VehicledbProvider,
    private _vehicletype: vehicleTypeProvider,
    private toastController: ToastController
  ) {
    this.searchVehicle = new FormControl();
  }

  async ngOnInit() {
    this.uid = localStorage.getItem("id");
    this.menuController.enable(true);

    const toast = await this.toastController.create({
      message: "Your Vehicles Retrieved",
      duration: 2000
    });
    this._vehicle.getVehicleByUser(this.uid).subscribe(
      (data: vehicle[]) => {
        this.vehicles = data;
        this.vehiclesDup = data;
        if (vehicle.length == 0) {
          this.showList = true;
        }
      },
      err => {
        console.log(err);
      },
      () => {
        toast.present();
      }
    );

    this._vehicletype.getAllVehicleType().subscribe(
      (data: any) => {
        this.vehicle_type = data;
      },
      err => {
        console.log(err);
      },
      () => {
        toast.present();
      }
    );
  }

  async openModel() {
    const model: HTMLIonModalElement = await this.modelController.create({
      component: AddVehicleModelPage,
      componentProps: { value: 123 }
    });

    model.onDidDismiss().then((val: any) => {
      if (val !== null) {
        this.ngOnInit();
        /* console.log(val.data); */
      }
    });

    await model.present();
  }

  getItems(ev) {
    this.vehicles = this.vehiclesDup;
    const val = ev.target.value;
    if (val && val.trim() !== "") {
      this.vehicles = this.vehicles.filter(
        x =>
          x.vehicle_no.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1
      );
    }
  }

  async deleteVehicle(vehicle_no: number) {
    const confirmBox = await this.alertController.create({
      header: "Confirm!",
      message: "Are you sure you want to delete this vehicle?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary"
        },
        {
          text: "Yes",
          handler: () => {
            this._vehicle.deleteVehicleByUser(vehicle_no).subscribe(
              (data: any) => {
                this.ngOnInit();
              },
              err => {
                console.log(err);
              },
              () => {
                console.log("deleted");
              }
            );
          }
        }
      ]
    });
    confirmBox.present();
  }
}
