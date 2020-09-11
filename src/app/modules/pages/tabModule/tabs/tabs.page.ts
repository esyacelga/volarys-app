import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../services/mensajeria/data.service';
import {SolcitudDetalleModel} from '../../../classes/mensajeria/SolcitudCabeceraModel';
import {SolicitudService} from '../../../services/mensajeria/solicitud.service';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

    public valorPedido;

    constructor(private dataService: DataService, private svrSolicitud: SolicitudService) {
    }

    async ngOnInit() {
        await this.svrSolicitud.getDetalleSolicitud();
        const lstDetalleEmmiter: SolcitudDetalleModel[] = this.svrSolicitud.lstDetalle;
        this.valorPedido = lstDetalleEmmiter.length;
        this.dataService.lstPedido$.subscribe((lstPedido: SolcitudDetalleModel[]) => {
            this.valorPedido = lstPedido.length;
        });
    }


}
