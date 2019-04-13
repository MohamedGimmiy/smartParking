import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  blutoothUnpairedDevices: any;
  pairedDevices: any;
  selectedDevice: any;
  constructor(public navCtrl: NavController,
    public blutooth: BluetoothSerial,
    public platform: Platform) {

    // check if blutooth is enabled or not
    // then if not display a message to enable blutooth
    // check if platform is android
    if (this.platform.is('android')) {

      this.blutooth.isEnabled().then(() => {
        // blutooth is enabled
      }, () => {
        // display message if blutooth is not enabled
        // ask user to enable the blutooth
        this.blutooth.enable().then(() => {
          console.log("blutooth is requested");
        });
      });
    }

  }
  ionViewWilEnter() {
    // paired devices 
    this.blutooth.list().then(data => {
      this.pairedDevices = data;
    });
  }
  //-------------------- scaning for available devices ------------------//
  scan() {

    this.blutooth.isEnabled().then(() => {
      // blutooth is available
      // get all devices available
      this.blutooth.discoverUnpaired().then(data => {
        this.blutoothUnpairedDevices = data; // unpaird devices
      });

    }, () => {
      // blutooth is not available
      this.blutooth.enable().then(() => {
        console.log("blutooth is requested");
      });
    });

  }
  // ----------------- choose a selected device ----------------- //
  chooseDevice() {
    this.blutooth.connect(this.selectedDevice.address).subscribe(() => {
      alert("conncted succrssfully");
      console.log("connected successfully");
    }, () => {
      alert("connected failed");
      console.log("connection failed");
    });
  }

  // normal parking or auto parking
  parking(num: any) {
    this.blutooth.isConnected().then(() => {
      // successfully connected 
      this.blutooth.write(num).then(() => {
        console.log("data sent to blutooth");
        this.measuring(); // Wait for results

      }, () => {
        console.log("data was not sent");
      });
    }, () => {
      // failed to connect
      alert("failed to connect to server");
    });
  }

  // if any controller was clicked
  btnClicked(num: any) {
    this.blutooth.isConnected().then(() => {
      // successfully connected 
      this.blutooth.write(num).then(() => {
        console.log("data sent to blutooth");
      }, () => {
        console.log("data was not sent");
      });
    }, () => {
      // failed to connect
      alert("failed to connect to server");
    });
  }

  // recieving data from arduino then make a prediction to the data for a model machine learning
  measuring() {
    this.blutooth.available().then((number: any) => {
      this.blutooth.read()
        .then((data: any) => {
          if (data[0] == "D" && data[16] == "F") {
            //this.measure1 = parseFloat(data[1]+data[2]+data[3]+data[4]+data[5]);
            //this.measure2 = parseFloat(data[6]+data[7]+data[8]+data[9]+data[10]);
            //this.measure3 = parseFloat(data[11]+data[12]+data[13]+data[14]+data[15]);

            this.blutooth.clear();
          }
        });
    });
  }
}
