import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/api/github/github.service';
import {  Subject } from 'rxjs';
import { SearchService } from '../services/search/search.service';
import { iRepo } from './../interfaces/iRepo';
import { iGitRepo } from './../interfaces/iGitRepo';

const REPO_LIMIT = 50;
@Component({
  selector: 'app-collector',
  templateUrl: './collector.component.html',
  styleUrls: ['./collector.component.scss']
})
export class CollectorComponent implements OnInit {
  private _username: string;
  private _username$ =  new Subject<string>();
  public repoLimit = REPO_LIMIT;
  public errorMsg:string;
  public collectedRepo: iRepo[] = [];

  public isLoading:boolean =false;
  constructor(
    private githubService: GithubService,
    private searchService: SearchService
  ){}
  ngOnInit() {

    this.searchService.getUsername$().subscribe((username: string) => {
      if(username === '') return
      this.setUsername(username);
      this.collectRepo(username);
    })
  }
  public collectRepo(username: string){
    this.githubService.getReposNotForked(username,1,this.repoLimit)
      .subscribe(//@to do mergeMap?
        (reposData:iGitRepo[]) => {
          reposData.map((repoData:iGitRepo) => {
            this.collectBranches(repoData);
          })
        },
        (error) => {
          console.log(error);
        }
      );
  }
  public collectBranches(repoData: iGitRepo){
    this.githubService.getBranches(this._username , repoData)
      .subscribe(
        (branch) => {
          this.collectedRepo.push({name: repoData.name, login: repoData.login, branches: branch});
        },
        (error) => {
          console.log(error);
        }
      )
  }
  public setUsername( username: string ){
    this._username = username;
  }
}
