import {Component, OnInit} from '@angular/core';
import {StorageAppService} from '../../../system/generic/service/storage-app.service';
import {ModalController, NavController, Platform} from '@ionic/angular';
import {ProfileComponent} from '../../../components/profile/profile.component';
import {Facebook} from '@ionic-native/facebook/ngx';
import {Util} from '../../../system/generic/classes/util';
import {COLOR_TOAST_ERROR, COLOR_TOAST_PRIMARY, COLOR_TOAST_WARNING} from '../../../system/generic/classes/constant';

@Component({
    selector: 'app-tab3',
    templateUrl: 'settings.page.html',
    styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit {

    panelActivo = true;

    constructor(private svrStorage: StorageAppService,
                private modalCtrl: ModalController,
                private platform: Platform,
                private svrFB: Facebook,
                private util: Util,
                private navCtrl: NavController) {
    }

    async activarPanel(opcion: boolean) {
        const modal = await this.modalCtrl.create({
            component: ProfileComponent,
            componentProps: {title: 's', tipoError: 's', mensaje: 'mensajeError'}
        });
        await modal.present();
        const {data} = await modal.onDidDismiss();

    }

    salirSesion() {
        this.svrStorage.eliminarTodo();
        this.navCtrl.navigateRoot('login');
        if (this.platform.is('cordova')) {
            this.svrFB.logout().then(data => {
                this.util.presentToast('Ha cerrardo sesion', COLOR_TOAST_PRIMARY);
            }, (error) => {
                this.util.presentToast('Ha cerrardo sesion', COLOR_TOAST_WARNING);
            });
        }
    }


    ngOnInit() {
    }

}
