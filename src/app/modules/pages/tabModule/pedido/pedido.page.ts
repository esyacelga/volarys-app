import {Component, OnInit} from '@angular/core';
import {SolcitudCabeceraModel, SolcitudDetalleModel} from '../../../classes/mensajeria/SolcitudCabeceraModel';
import {SolicitudService} from '../../../services/mensajeria/solicitud.service';
import {StorageAppService} from '../../../system/generic/service/storage-app.service';
import {PushNotificationService} from '../../../system/generic/service/push-notification.service';
import {MensajeOneSignal} from '../../../system/generic/classes/MensajeOneSignal';
import {ObjetoTipoUsuarioPersona} from '../../../classes/persona/ObjetoTipoUsuarioPersona';
import {GRUPO_ADMINISTRADOR} from '../../../system/generic/classes/constant';
import {ModalController, NavController, Platform} from '@ionic/angular';
import {DataService} from '../../../services/mensajeria/data.service';
import {HistorialComprasComponent} from "../../../components/historial-compras/historial-compras.component";

@Component({
    selector: 'app-tab2',
    templateUrl: 'pedido.page.html',
    styleUrls: ['pedido.page.scss']
})
export class PedidoPage implements OnInit {

    lstDetalle: SolcitudDetalleModel[] = [];
    sumatoria = 0;

    constructor(private svrSolicitud: SolicitudService, private modalCtrl: ModalController,
                private platform: Platform, private nvrServ: NavController, private dataService: DataService,
                private svrStorage: StorageAppService, private svrNoti: PushNotificationService) {
    }


    eliminarLista() {
        this.sumatoria = 0;
        this.lstDetalle = [];
        this.transform([]);
        this.eliminarListaPedido();
    }

    public async abrirListaPedidos() {
        const modal = await this.modalCtrl.create({
            component: HistorialComprasComponent,
            componentProps: {title: 's', tipoError: 's', mensaje: 'mensajeError'}
        });
        await modal.present();
        const {data} = await modal.onDidDismiss();
    }


    async registrarSolicitud() {
        const data: ObjetoTipoUsuarioPersona = (await this.svrStorage.loadStorageObject('usuario')) as ObjetoTipoUsuarioPersona;
        const cabeceraSolicitud = new SolcitudCabeceraModel(null, data.usuario._id, 1, this.lstDetalle);
        await this.svrSolicitud.registarSolicitud(cabeceraSolicitud);
        const mensaje: MensajeOneSignal = new MensajeOneSignal();
        mensaje.tittuloNotificacion = 'Nuevo pedido';
        let nombre = '';
        if (!data.persona) {
            nombre = 'Usuario';
        }
        if (data.persona) {
            nombre = (data.persona.nombres + ' ' + data.persona.apellidos) || data.persona.correo;
        }
        mensaje.detalleNotificacion = 'El usuario: ' + nombre + ' ha generado una nueva solicitud';
        mensaje.grupoUsuarios = GRUPO_ADMINISTRADOR;
        mensaje.key = 'ruta';
        mensaje.valor = 'managment';
        // this.nvr.navigateForward('managment');
        await this.svrNoti.enviarNotificacion(mensaje, 'Su pedido ha sido notificada');
        await this.svrNoti.pwaEnvioNotificacion('Nuevo Pedido', mensaje.detalleNotificacion);
        this.eliminarLista();

    }


    transform(lstDetalle: SolcitudDetalleModel[]) {
        this.sumatoria = 0;
        for (const entry of lstDetalle) {
            this.sumatoria = (entry.cantidad * entry.unidadCosto) + this.sumatoria;
        }
        // @ts-ignore
        this.sumatoria = this.sumatoria.toFixed(2);
        this.svrStorage.setStorageObject(this.lstDetalle, 'DetalleSolicitud');
    }


    add(item: SolcitudDetalleModel) {
        item.cantidad = item.cantidad + 1;
        this.transform(this.lstDetalle);
    }

    remove(item: SolcitudDetalleModel) {
        if (item.cantidad === 1) {
            return;
        }
        item.cantidad = item.cantidad - 1;
        this.transform(this.lstDetalle);
    }

    eliminar(item) {
        this.lstDetalle.splice(item, 1);
        this.dataService.lstPedido$.emit(this.lstDetalle);
        this.svrStorage.setStorageObject(this.lstDetalle, 'DetalleSolicitud');
    }

    private eliminarListaPedido() {
        this.lstDetalle = [];
        this.dataService.lstPedido$.emit(this.lstDetalle);
        this.svrStorage.setStorageObject(this.lstDetalle, 'DetalleSolicitud');
    }

    async ngOnInit() {
        // @ts-ignore
        this.lstDetalle = await this.svrSolicitud.lstDetalle;
        this.transform(this.lstDetalle);
    }

    async ionViewWillEnter() {
        await this.svrSolicitud.getDetalleSolicitud();
        this.lstDetalle = await this.svrSolicitud.lstDetalle;
        this.transform(this.lstDetalle);
    }


}
