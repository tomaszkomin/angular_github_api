import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/api/github/github.service';
import { BehaviorSubject } from 'rxjs';
const NAME = 'tomaszkomin';
@Component({
  selector: 'app-collector',
  templateUrl: './collector.component.html',
  styleUrls: ['./collector.component.scss']
})
export class CollectorComponent implements OnInit {
  private _name = NAME;
  private _name$ =  new BehaviorSubject<string>(this._name);
  public respositoryObj;
  constructor( private githubService:GithubService) {}

  ngOnInit() {
    this.respositoryObj = this.githubService.getRepos(this._name)
      .subscribe((repoData) => {
        console.log(repoData)
    });
    console.log(this.respositoryObj);
  }
}
