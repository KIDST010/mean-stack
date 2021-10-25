import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GamesdataService } from '../gamesdata.service';
import { Game } from '../games-list/games-list.component';

@Component({
  selector: 'app-game-one',
  templateUrl: './game-one.component.html',
  styleUrls: ['./game-one.component.css']
})
export class GameOneComponent implements OnInit {
  game!: Game
  constructor(private route: ActivatedRoute, private gamesdataService: GamesdataService) {
   
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id
    console.log("id is", id);


    this.gamesdataService.getOneGame(id).then(response => this.game = response);
    this.gamesdataService.getOneGame(id).then(function (response) {
      // this.game = response;
      console.log(response);

    })

  }

}




