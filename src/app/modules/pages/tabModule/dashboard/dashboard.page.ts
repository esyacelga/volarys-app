import {Component, OnInit} from '@angular/core';
import {Articulo} from '../../../classes/mensajeria/Articulo';
import {TipoArticulo} from '../../../classes/mensajeria/tipo-articulo';
import {TipoArticuloClientService} from '../../../services/mensajeria/tipo-articulo-client.service';
import {ModeloTipoUsuarioPersona} from '../../../classes/persona/TipoUsuarioPersona';
import {NavController, Platform} from '@ionic/angular';

@Component({
    selector: 'app-tab1',
    templateUrl: 'dashboard.page.html',
    styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {

    articulo: Articulo;
    tipoArticulo: TipoArticulo;
    lstTipoArticulo: any[];
    modeloPersonaTipoUsuario: ModeloTipoUsuarioPersona;


    constructor(private svcTipoArticulo: TipoArticuloClientService, private platform: Platform, private nvrServ: NavController) {
        /*this.platform.backButton.subscribeWithPriority(5, () => {
            this.tipoArticulo = null;
        });*/
    }

    async ngOnInit() {
        this.lstTipoArticulo = (await this.svcTipoArticulo.obtenerTipoArticulos()) as [];
    }

    ionViewWillEnter() {
        this.tipoArticulo = null;
    }

    selecionar(item: TipoArticulo) {
        this.tipoArticulo = item;
    }


}
