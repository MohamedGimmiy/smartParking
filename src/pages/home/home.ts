import { Component } from '@angular/core';
import {IonicPage, NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  blutoothUnpairedDevices : any;
  pairedDevices : any;
  selectedDevice : any;
  constructor(public navCtrl: NavController,
              public blutooth:BluetoothSerial) {

                // check if blutooth is enabled or not
                // then if not display a message to enable blutooth
/*                 this.blutooth.isEnabled().then(()=>{
                  // blutooth is enabled
                },()=>{
                  // display message if blutooth is not enabled
                  // ask user to enable the blutooth
                  this.blutooth.enable().then(()=>{
                    console.log("blutooth is requested");
                  });
                }); */


  }
  ionViewWilEnter(){
      // paired devices 
      this.blutooth.list().then(data=>{
        this.pairedDevices = data;
      });
  }
  //-------------------- scaning for available devices ------------------//
  scan(){

    this.blutooth.isEnabled().then(()=>{
      // blutooth is available
      // get all devices available
      this.blutooth.discoverUnpaired().then(data=>{
        this.blutoothUnpairedDevices = data; // unpaird devices
      });

    },()=>{
      // blutooth is not available
      this.blutooth.enable().then(()=>{
        console.log("blutooth is requested");
      });
    });

  }
  // ----------------- choose a selected device ----------------- //
  chooseDevice(){
    this.blutooth.connect(this.selectedDevice.address).subscribe(()=>{
      alert("conncted succrssfully");
      console.log("connected successfully");
    },()=>{
      alert("connected failed");
      console.log("connection failed")
    });
  }
}
