import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Game } from '../games-list/games-list.component';
import { GamesdataService } from '../gamesdata.service';

@Component({
  selector: 'app-game-delete',
  templateUrl: './game-delete.component.html',
  styleUrls: ['./game-delete.component.css']
})
export class GameDeleteComponent implements OnInit {
  games!: Game;
game!:Game;

  constructor(private gamesdataService: GamesdataService, private route:ActivatedRoute, private _router:Router) { }

  ngOnInit(): void {
    let gameId = this.route.snapshot.params.gameId
    console.log("id is", gameId);
    this.gamesdataService.getOneGame(gameId).then(response => this.games = response);
  }
  ondelete(){
    let gameId = this.route.snapshot.params.gameId
    this.gamesdataService.deletegame(gameId).then(response => this.game = response)
    this._router.navigate(["/games"])
    
  }

}
