import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ComponentModule} from '../../../components/component.module';
import {PedidoPage} from './pedido.page';

@NgModule({
    imports: [
        ComponentModule,
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: PedidoPage}])
    ],
    declarations: [PedidoPage]
})
export class Tab2PageModule {
}
