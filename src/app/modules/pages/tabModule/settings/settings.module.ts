import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SettingsPage} from './settings.page';
import {ComponentModule} from '../../../components/component.module';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        PipesModule,
        ComponentModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: SettingsPage}])
    ],
    declarations: [SettingsPage],
    entryComponents: []
})
export class SettingsModule {
}
