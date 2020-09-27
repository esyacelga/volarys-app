import {Component} from '@angular/core';

import {AlertController, NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {StorageAppService} from './modules/system/generic/service/storage-app.service';
import {PushNotificationService} from './modules/system/generic/service/push-notification.service';
import {ModeloTipoUsuarioPersona} from './modules/classes/persona/TipoUsuarioPersona';
import {Network} from '@ionic-native/network/ngx';
import {Util} from './modules/system/generic/classes/util';
import {COLOR_TOAST_DARK, COLOR_TOAST_SUCCESS, OFFLINE, ONLINE} from './modules/system/generic/classes/constant';
import {Location} from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    usuario: any;
    modeloPersonaTipoUsuario: ModeloTipoUsuarioPersona;


    constructor(
        private location: Location,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private navCtrl: NavController,
        private svrStorage: StorageAppService,
        private svrNet: Network,
        private util: Util,
        public alertController: AlertController,
        private nvrServ: NavController,
        private svtNotificacion: PushNotificationService
    ) {
        this.initializeApp();
    }


    public initializeApp() {
        this.platform.ready().then(async () => {
            this.iniciaPulginCordova();
            this.modeloPersonaTipoUsuario = (await this.svrStorage.loadStorageObject('usuario')) as ModeloTipoUsuarioPersona;
            if (this.modeloPersonaTipoUsuario && this.modeloPersonaTipoUsuario.usuario && this.modeloPersonaTipoUsuario.usuario.clave) {
                this.navCtrl.navigateRoot('main');
            } else {
                this.navCtrl.navigateRoot('login');
            }
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });

        if (this.platform.is('cordova')) {
            this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
                // this.nvrServ.navigateForward('main/tabs/tab1');
                if (this.location.isCurrentPathEqualTo('/main/tabs/tab1')) {
                    this.showExitConfirm();
                    processNextHandler();

                } else {
                    this.location.back();
                }
            });
        }
    }


    /*  ngOnDestroy() {
          this.svrCar.actualizarCatalogosStorage();
      }
  */
    public showExitConfirm() {
        this.alertController.create({
            header: 'Salida',
            message: 'Desea salir de la aplicación?',
            backdropDismiss: false,
            buttons: [{
                text: 'Quedarse',
                role: 'cancel',
                handler: () => {
                    console.log('Application exit prevented!');
                }
            }, {
                text: 'Salir',
                handler: () => {
                    navigator['app'].exitApp();
                }
            }]
        })
            .then(alert => {
                alert.present();
            });
    }

    public iniciaPulginCordova() {
        if (this.platform.is('cordova')) {
            this.svtNotificacion.configuracionProcesoNotificacion();
            this.svrNet.onDisconnect().subscribe(() => {
                this.util.presentToast(OFFLINE, COLOR_TOAST_DARK);
                this.svrNet.onConnect().subscribe(() => {
                    this.util.presentToast(ONLINE, COLOR_TOAST_SUCCESS);
                });
            });
        }
    }

}
