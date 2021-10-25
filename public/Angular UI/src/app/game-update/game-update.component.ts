import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Game } from '../games-list/games-list.component';
import { GamesdataService } from '../gamesdata.service';
@Component({
  selector: 'app-game-update',
  templateUrl: './game-update.component.html',
  styleUrls: ['./game-update.component.css']
})
export class GameUpdateComponent implements OnInit {
games!:Game;
@ViewChild("updateGame")
  updateGame!: NgForm;

  constructor(private gamesdataService: GamesdataService, private route:ActivatedRoute, private _router:Router) { }

  ngOnInit(): void {
    let gameId = this.route.snapshot.params.gameId
    console.log("id is", gameId);
    this.gamesdataService.getOneGame(gameId).then(response => this.games = response);
  }
  onupdate(): void {
    let gameId = this.route.snapshot.params.gameId;   
    console.log("body ", this.updateGame.value);    

    this.gamesdataService
      .updateGame(this.updateGame.value, gameId)
      .then((response) => (this.games = response));

       window.location.reload();

  }
}
