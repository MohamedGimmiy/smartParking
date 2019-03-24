import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartingPage } from './starting';

@NgModule({
  declarations: [
    StartingPage,
  ],
  imports: [
    IonicPageModule.forChild(StartingPage),
  ],
})
export class StartingPageModule {}
