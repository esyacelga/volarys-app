import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Heroe, HeroesService} from '../../servicios/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {
  heroe: Heroe = null;

  constructor(private activateRoute: ActivatedRoute, private servicioHeroe: HeroesService) {
    this.activateRoute.params.subscribe(params => {
      this.heroe = servicioHeroe.getHeroe(params['id']);
    });
  }

  ngOnInit() {
  }

}
