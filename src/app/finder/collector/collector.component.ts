import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/api/github/github.service';
import { BehaviorSubject, Subscription } from 'rxjs';
const NAME = 'tomaszkomin';
//const NAME = 'paulirish';
@Component({
  selector: 'app-collector',
  templateUrl: './collector.component.html',
  styleUrls: ['./collector.component.scss']
})
export class CollectorComponent implements OnInit {
  private _username = NAME;
  private _username$ =  new BehaviorSubject<string>(this._username);
  public errorMsg:string;
  public collectedRepo:{ name:string, branches: any[] }[] = [];

  constructor( private githubService:GithubService) {}
  ngOnInit() {
    this.collectRepo();
  }
  public collectRepo(){
    this.githubService.getReposNotForked(this._username)
      .subscribe(
        (reposData:string[]) => {
          reposData.map((repoData: string) => {
            this.collectBranches(repoData);
          })
        },
        (error) => {
          console.log(error);
          alert(error);
        }
      );
  }
  public collectBranches( repoData: string ){
    this.githubService.getBranches(this._username ,repoData)
      .subscribe(
        (branch) => {
          this.collectedRepo.push({name: repoData, branches: branch});
          console.log(this.collectedRepo);
        },(error) => {
          console.log(error);
        }
      )
  }
}
