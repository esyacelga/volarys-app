import {EventEmitter, Injectable} from '@angular/core';
import {SolcitudDetalleModel} from '../../classes/mensajeria/SolcitudCabeceraModel';


@Injectable({
    providedIn: 'root'
})
export class DataService {
    lstPedido$ = new EventEmitter<SolcitudDetalleModel[]>();

    constructor() {

    }

}
