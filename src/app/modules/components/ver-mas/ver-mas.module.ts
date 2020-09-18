import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {VerMasPage} from './ver-mas.page';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        IonicModule,
    ],
    declarations: [VerMasPage]
})
export class VerMasPageModule {
}
