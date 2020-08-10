import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ModalPage } from './pages/modal/modal.page';
import { ActiveGuardService } from './active-guard.service';
import { HelperService } from './helper.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { FilePath } from "@ionic-native/file-path/ngx";
import {
  FileTransfer,
} from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Media } from '@ionic-native/media/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { ActivatedRoute } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';



@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  declarations: [AppComponent, ModalPage],
  entryComponents: [ModalPage],
  providers: [
    InAppBrowser,
    SplashScreen,
    StatusBar,
    Camera,
    FileTransfer,
    File,
    Media,
    StreamingMedia,
    FilePath,
    FileChooser,
    NativeAudio,
    Keyboard,
    ActiveGuardService,
    HelperService,
    Network,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,

    }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
