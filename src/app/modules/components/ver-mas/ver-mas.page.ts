import {Component, Input, OnInit} from '@angular/core';
import {ObjetoArticulo} from '../../classes/mensajeria/Articulo';

@Component({
    selector: 'app-ver-mas',
    templateUrl: './ver-mas.page.html',
    styleUrls: ['./ver-mas.page.scss'],
})
export class VerMasPage implements OnInit {
    @Input() public objArticulo: ObjetoArticulo;

    constructor() {
    }

    ngOnInit() {
    }

}
