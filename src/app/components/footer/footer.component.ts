import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  fechaActual: number;

  constructor() {
    this.fechaActual = new Date().getFullYear();
  }

  ngOnInit() {
  }

}
