import {Component, OnInit} from '@angular/core';
import {Heroe, HeroesService} from '../../servicios/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Heroe[] = [];

  constructor(private _heroesService: HeroesService) {
  }

  ngOnInit() {
    this.heroes = this._heroesService.getLstHeroes();
    console.log(this.heroes);
  }

}
