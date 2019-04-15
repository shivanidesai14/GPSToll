/*
  Background GeoLocaiton Tracking Plugins installation
1.Permissions
ionic cordova plugin add cordova-plugin-android-permissions
npm install @ionic-native/android-permissions

2.Location Accuracy
ionic cordova plugin add cordova-plugin-request-location-accuracy
npm install @ionic-native/location-accuracy

3.GeoLocation
ionic cordova plugin add cordova-plugin-geolocation
npm install @ionic-native/geolocation

4.Background GeoLocation
ionic cordova plugin add cordova-plugin-mauron85-background-geolocation@alpha
npm install @ionic-native/background-geolocation

5.Local Notification
ionic cordova plugin add cordova-plugin-local-notification
npm install @ionic-native/local-notifications


*/

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonicSelectableModule } from "ionic-selectable";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";

import { TollplazaService } from "./providers/tollplazadb/tollplaza.service";
import { UserserviceService } from "./providers/userDB/userservice.service";
import { VehicledbProvider } from "./providers/vehicledb/vehicledb";
import { vehicleTypeProvider } from "./providers/vehicledb/vehicleType";
import { PaymentmethodService } from "./providers/paymentmethoddb/paymentmethod.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
//Background Geolocation
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { LocationAccuracy } from "@ionic-native/location-accuracy/ngx";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { BackgroundGeolocation } from "@ionic-native/background-geolocation/ngx";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { Md5 } from "ts-md5";
import { GoogleMaps } from "@ionic-native/google-maps/ngx";

//ends here

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicSelectableModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TollplazaService,
    UserserviceService,
    VehicledbProvider,
    vehicleTypeProvider,
    PaymentmethodService,
    /*
    Background Geolocation
    */
    AndroidPermissions,
    LocationAccuracy,
    Geolocation,
    BackgroundGeolocation,
    LocalNotifications,
    Md5,
    GoogleMaps
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
