import {Component, Input, OnInit} from '@angular/core';
import {TipoArticulo} from '../../classes/mensajeria/tipo-articulo';
import {Segmento} from '../../classes/mensajeria/Segmento';
import {Articulo} from '../../classes/mensajeria/Articulo';
import {SegmentoService} from '../../services/mensajeria/segmento.service';
import {ArticuloService} from '../../services/mensajeria/articulo.service';
import {StorageAppService} from '../../system/generic/service/storage-app.service';


@Component({
    selector: 'app-item-seleccionado',
    templateUrl: './item-seleccionado.component.html',
    styleUrls: ['./item-seleccionado.component.scss'],
})
export class ItemSeleccionadoComponent implements OnInit {

    @Input() tipoArticulo: TipoArticulo;
    lstSegmento: Segmento[];
    lstArticulo: Articulo[];

    constructor(private svrSegmentoAticulo: SegmentoService, private svrArticulo: ArticuloService, private svrStorage: StorageAppService) {
    }

    async ngOnInit() {
        this.lstSegmento = await this.svrSegmentoAticulo.obtenerSegmentoPorArticulo(this.tipoArticulo._id) as Segmento[];
        this.lstArticulo = (await this.svrStorage.loadStorageObject('lstArticulo')) as Articulo[]
        if (this.lstArticulo && this.lstArticulo.length === 0) {
            this.lstArticulo = await this.svrArticulo.obtenerArticulos() as Articulo[];
        }
    }


}
