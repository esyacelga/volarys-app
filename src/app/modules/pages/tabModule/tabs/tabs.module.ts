import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TabsPageRoutingModule} from './tabs.router.module';

import {TabsPage} from './tabs.page';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        PipesModule,
        FormsModule,
        FontAwesomeModule,
        TabsPageRoutingModule
    ],
    declarations: [TabsPage]
})
export class TabsPageModule {
}
