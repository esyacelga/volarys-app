import {Component, Input, OnInit} from '@angular/core';
import {ObjetoArticulo} from '../../classes/mensajeria/Articulo';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import {ParametroInterface} from '../../interfaces/common/ParametroInterface';
import {ParametroService} from '../../services/common/parametro.service';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-ver-mas',
    templateUrl: './ver-mas.page.html',
    styleUrls: ['./ver-mas.page.scss'],
})
export class VerMasPage implements OnInit {
    @Input() public objArticulo: ObjetoArticulo;
    public wstp = faWhatsapp;
    public numeroContacto: string;
    public parametro: ParametroInterface;


    constructor(private svrParametro: ParametroService, public modal: ModalController) {
    }


    public abrirChat(numero) {
        window.open(numero, '_system');
    }

    async ngOnInit() {
        this.parametro = (await this.svrParametro.obtenerParametroPorCodigo('NUMERO_TELEFONO_WATSUP') as ParametroInterface);
        this.numeroContacto = 'whatsapp://send?phone=' + this.parametro.valor + '';
    }

}
