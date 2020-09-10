import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-image-modal',
    templateUrl: './image-modal.page.html',
    styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {

    @Input() public nombre: string;
    @Input() public directorio: string;

    constructor() {
    }

    ngOnInit() {
    }

}
