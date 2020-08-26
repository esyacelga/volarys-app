import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {CommentComponent} from './comment.component';
import {PipesModule} from '../../pipes/pipes.module';


@NgModule({
    imports: [
        CommonModule,
        PipesModule,
        FormsModule,
        IonicModule,
    ],
    declarations: [CommentComponent]
})
export class ItemCommentModule {
}
