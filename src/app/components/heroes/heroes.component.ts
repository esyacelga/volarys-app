import {Component, OnInit} from '@angular/core';
import {Heroe, HeroesService} from '../../servicios/heroes.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Heroe[] = [];

  constructor(private _heroesService: HeroesService, private svrRouter: Router) {
  }

  ngOnInit() {
    this.heroes = this._heroesService.getLstHeroes();
    console.log(this.heroes);
  }

  verHeroe(idx: number) {
    this.svrRouter.navigate(['/heroe', idx]);
  }

}
