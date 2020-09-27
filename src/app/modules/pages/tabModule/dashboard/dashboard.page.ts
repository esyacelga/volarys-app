import {Component, OnInit} from '@angular/core';
import {Articulo} from '../../../classes/mensajeria/Articulo';
import {TipoArticulo} from '../../../classes/mensajeria/tipo-articulo';
import {TipoArticuloClientService} from '../../../services/mensajeria/tipo-articulo-client.service';
import {Platform} from '@ionic/angular';
import {CatalogosMensajeriaService} from '../../../services/mensajeria/CatalogosMensajeria.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'dashboard.page.html',
    styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {

    articulo: Articulo;
    tipoArticulo: TipoArticulo;
    lstTipoArticulo: any[];


    constructor(private svcTipoArticulo: TipoArticuloClientService,
                private svrArticulo: CatalogosMensajeriaService,
                private platform: Platform) {
        this.platform.backButton.subscribeWithPriority(20, (processNextHandler) => {
            if (this.tipoArticulo === null) {
                processNextHandler();
            } else {
                this.tipoArticulo = null;
            }
        });

    }

    async ngOnInit() {
        this.lstTipoArticulo = (await this.svcTipoArticulo.obtenerTipoArticulos()) as [];
        this.svrArticulo.actualizarCatalogosArticulo();
    }

    ionViewWillEnter() {
        this.tipoArticulo = null;
    }

    selecionar(item: TipoArticulo) {

        this.tipoArticulo = item;
    }


}
