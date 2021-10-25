import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Game } from './games-list/games-list.component';

@Injectable({
  providedIn: 'root'
})
export class GamesdataService {
  private apiBaseUrl: string = "http://localhost:3000/"
  constructor(private httpClient: HttpClient) { }

  public getGames(): Promise<Game[]> {
    // + "/games"
    const url: string = this.apiBaseUrl+ "games"
    return this.httpClient.get(url).toPromise()
      .then((response) => response as Game[])
      .catch(this.handleError);
  };
  
  public getOneGame(id: string): Promise<Game> {

    const url: string = this.apiBaseUrl + "games/" + id
    return this.httpClient.get(url).toPromise()
      .then(response => response as Game)
      .catch(this.handleError);


  };
 public addgame(post:Game): Promise<Game> {
    const url: string = this.apiBaseUrl+ "games"

    return this.httpClient.post(url, post).toPromise()
    .then(response=>response as Game)
    .catch(this.handleError)
  }
  
  public deletegame(gameId: string) : Promise<Game> {
    const url: string= this.apiBaseUrl+"games/"+gameId;
    return this.httpClient.delete(url).toPromise()
    .then(response => response as Game)
    .catch(this.handleError);
  }
  public updateGame(game: Game, gameId:string) : Promise<Game> {
    const url: string= this.apiBaseUrl+"games/"+gameId;
    return this.httpClient.put(url, game).toPromise()
    .then(response => response as Game)
    .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.log("something went wrong");
    return Promise.reject(error.message || error)

  }
}
