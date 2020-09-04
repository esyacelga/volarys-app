import {Component, OnInit} from '@angular/core';
import {StorageAppService} from '../../../system/generic/service/storage-app.service';
import {ModalController, NavController, Platform} from '@ionic/angular';
import {Util} from '../../../system/generic/classes/util';
import {ComentarioService} from '../../../services/common/comentario.service';
import {NotificacionMensajeDto} from '../../../interfaces/interfaces';
import {ModeloTipoUsuarioPersona} from '../../../classes/persona/TipoUsuarioPersona';

@Component({
    selector: 'app-tab3',
    templateUrl: 'config.page.html',
    styleUrls: ['config.page.scss']
})
export class ConfigPage implements OnInit {

    public playerId: string;
    public lsNotificaciones: NotificacionMensajeDto[] = [];
    public modeloPersonaTipoUsuario: ModeloTipoUsuarioPersona;

    constructor(private svrStorage: StorageAppService,
                private modalCtrl: ModalController,
                private platform: Platform,
                private svrComment: ComentarioService,
                private util: Util,
                private navCtrl: NavController) {
    }

    async ionViewDidEnter() {
        this.lsNotificaciones = (await this.svrComment.obtenerTodosNotificaciones() as unknown as NotificacionMensajeDto[]);
    }

    /*
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



    */
    async ngOnInit() {
        this.modeloPersonaTipoUsuario = (await this.svrStorage.loadStorageObject('usuario')) as ModeloTipoUsuarioPersona;
        this.playerId = this.modeloPersonaTipoUsuario.usuario.playerId;
    }
}
