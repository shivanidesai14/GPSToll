import { Injectable } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig,BackgroundGeolocationLogLevel, BackgroundGeolocationResponse,BackgroundGeolocationEvents } from '@ionic-native/background-geolocation/ngx';
import { Platform } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { HttpClient } from '@angular/common/http';
import { lat_lon } from 'src/app/shared/latitude_longitude';
@Injectable({
  providedIn: 'root'
})
export class LocationTrackingService {
  notiId:number=0;
  locationUrl:string="";
  url_nearby_tolls="http://localhost:3000/nearlocations";
  constructor(private platform: Platform,private http:HttpClient, private backgroundGeolocation: BackgroundGeolocation,private localNotifications:LocalNotifications) { }
  setSound() {
      if (this.platform.is('android')) {
        return 'file://assets/sounds/Rooster.mp3'
      } else {
        return 'file://assets/sounds/Rooster.caf'
      }
    }
  sendToServer(latitude:any,longitude:any){
    return this.http.get("http://localhost:3000/");
  }
  sendNotification(data:any) {
      var tod = new Date(new Date().getTime());
      // var msg = "There is a legendary Pokemon near you" + this.originalCoords.latitude + "<-latitude longitude-> " + this.originalCoords.longitude;
      this.localNotifications.schedule({
        text: data,
        trigger: { at: tod },
        sound: this.setSound(),
        data: { secret: "key" },
        id: this.notiId
      });
      this.notiId++;
    }
  printAndroidLogs(logEntries){
    console.log(logEntries);
  }
  checkNearyByTolls(latitude:any,longitude:any){
    this.http.get(this.url_nearby_tolls).subscribe((data:lat_lon[])=>{
      if(data.length>0){
        this.sendNotification("Please pay the toll of nearby tolls.");
      }
    });
  }
  startTracking() {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 20,
      distanceFilter: 30,
      debug: false, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      notificationTitle:"GPS Based Toll Collection System",
      url:"http://localhost:3000/"
      // syncUrl:"http://localhost:3000/",
      
      // interval:10000,
    };

    this.backgroundGeolocation.configure(config)
      .then(() => {

        this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
          console.log(location);
          // this.sendToServer(location.latitude,location.longitude).subscribe((data)=>{
          //   console.log("sending to server successful");
          // },()=>{
          //   console.log("error in http request");
          // },()=>{
          //   console.log("request completed");
          // });
          // this.backgroundGeolocation.forceSync();

          // this.sendNotification(location.latitude+" <- latitude longitude->"+location.longitude);
      
          // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
          // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
          // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
          this.backgroundGeolocation.finish(); // FOR IOS ONLY
        });
        this.backgroundGeolocation.watchLocationMode().subscribe((loc)=>{
          console.log("inside watchlocationMode() ",loc);
        });
      });

    // start recording location
    this.backgroundGeolocation.start();

  }
  stopTracking() {
    this.backgroundGeolocation.stop();
  }
}
