import {Component, OnInit} from '@angular/core';
import {SolicitudService} from '../../services/mensajeria/solicitud.service';
import {PedidoInterface} from '../../interfaces/mensajeria/PedidoInterface';
import {StorageAppService} from '../../system/generic/service/storage-app.service';
import {ModeloTipoUsuarioPersona} from '../../classes/persona/TipoUsuarioPersona';
import {ModalController, NavController} from '@ionic/angular';

@Component({
    selector: 'app-historial-compras',
    templateUrl: './historial-compras.component.html',
    styleUrls: ['./historial-compras.component.scss'],
})
export class HistorialComprasComponent implements OnInit {
    public lstPedidos: PedidoInterface[];
    private modeloPersonaTipoUsuario: ModeloTipoUsuarioPersona;

    constructor(private svrSolicitud: SolicitudService,
                private modal: ModalController,
                private nvrServ: NavController,
                private svrStorage: StorageAppService) {
    }

    public cerrrarPanel() {
        this.modal.dismiss();
        this.nvrServ.navigateForward('main/tabs/tab2');
    }

    async ngOnInit() {
        this.modeloPersonaTipoUsuario = (await this.svrStorage.loadStorageObject('usuario')) as ModeloTipoUsuarioPersona;
        this.lstPedidos = (await this.svrSolicitud.obtenerPedidosPotUsuario(this.modeloPersonaTipoUsuario.usuario._id) as PedidoInterface[]);
        console.log(this.lstPedidos);
    }
}
