import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../tournament/tournament.service';
import { SoloTournament, TeamTournament } from '../tournament/_models/tournament';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  tournaments: SoloTournament[];

  constructor(
    private tournamentService: TournamentService
  ) { }

  ngOnInit(): void {
    this.getAllTournament();
  }

  getAllTournament(): void {
    this.tournamentService.getAllSoloTournament()
      .subscribe(tournaments => { 
        this.tournaments = tournaments;
      });
    }


}
