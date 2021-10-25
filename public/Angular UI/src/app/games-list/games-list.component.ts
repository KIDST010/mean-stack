import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';


import { GamesdataService } from '../gamesdata.service';
@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  games: Game[] = [];
  game!: Game;
  @ViewChild("registerGame")
  registerGame!: NgForm;

  constructor(private gamesdataService: GamesdataService, private router: Router) {


  }



  ngOnInit(): void {
    this.gamesdataService.getGames().then((res) => {
      this.games = res
      console.log("the total result is " + res);

    }
    );
  }
  onAddGame(): void {

    console.log("body ", this.registerGame.value);


    this.gamesdataService
      .addgame(this.registerGame.value)
      .then((response) => (console.log("final result", response)));
    window.location.reload();

  }
  onSelect(game: any) {
    console.log("game.id:", game);

    this.router.navigate(['/games', game._id])
  }
}
export class Game {
  _id!: string;
  title!: string;
  price !: number;
  year!: number;
  minPlayers!: number;
  maxPlayers!: number;
  minAge!: number;


}
