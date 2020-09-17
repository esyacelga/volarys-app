import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../services/mensajeria/data.service';
import {SolcitudDetalleModel} from '../../../classes/mensajeria/SolcitudCabeceraModel';
import {SolicitudService} from '../../../services/mensajeria/solicitud.service';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import {ParametroInterface} from '../../../interfaces/common/ParametroInterface';
import {ParametroService} from '../../../services/common/parametro.service';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
    public wstp = faWhatsapp;
    public valorPedido;
    public numeroContacto: string;
    public parametro: ParametroInterface;

    constructor(private dataService: DataService, private svrSolicitud: SolicitudService, private svrParametro: ParametroService,) {
    }

    async ngOnInit() {
        this.parametro = (await this.svrParametro.obtenerParametroPorCodigo('NUMERO_TELEFONO_WATSUP') as ParametroInterface);
        this.numeroContacto = 'whatsapp://send?phone=' + this.parametro.valor + '';
        await this.svrSolicitud.getDetalleSolicitud();
        const lstDetalleEmmiter: SolcitudDetalleModel[] = this.svrSolicitud.lstDetalle;
        this.valorPedido = lstDetalleEmmiter.length;
        this.dataService.lstPedido$.subscribe((lstPedido: SolcitudDetalleModel[]) => {
            this.valorPedido = lstPedido.length;
        });
    }


}
