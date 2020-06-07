import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/api/github/github.service';
import { Subject } from 'rxjs';
import { SearchService } from '../services/search/search.service';
import { iRepo } from './../interfaces/iRepo';
import { iGitRepo } from './../interfaces/iGitRepo';
import { environment} from './../../../environments/environment';

@Component({
  selector: 'app-collector',
  templateUrl: './collector.component.html',
  styleUrls: ['./collector.component.scss']
})
export class CollectorComponent implements OnInit {
  private _username: string;
  private _username$ =  new Subject<string>();
  public repoLimit = environment.GITHUB_REPOS_LIMIT;
  public repoPage = environment.REPO_INITIAL_PAGE;
  public errorMsg:string;
  public collectedRepo: iRepo[] = [];
  public nextPage:boolean = false;
  public isLoading:boolean = false;
  constructor(
    private githubService: GithubService,
    private searchService: SearchService,
  ){}
  ngOnInit() {
    this._handleUsernameSub();
  }
  private _handleUsernameSub(){
    this.searchService.getUsername$().subscribe((username: string) => {
      if(username === '') return
      this._username = username;
      this.clearCollectedRepo();
      this.setUsername(this._username);
      this.collectRepo(this._username);
    })
  };
  public collectRepo(username: string){
    this.githubService.getReposMetaData(username, this.repoPage ,this.repoLimit)
      .subscribe((meta)=>{
        this.nextPage = !!meta //!! map to boolean
      });
     this.githubService.getReposNotForked(username, this.repoPage ,this.repoLimit)
       .subscribe(//@to do mergeMap?
         (reposData: iGitRepo[]) => {
           reposData.map((repoData: iGitRepo) => {
             this.collectBranches(repoData);
           })
         },
         (error) => { console.log(error);}
    );
  }
  public collectBranches(repoData: iGitRepo){
    this.githubService.getBranches(this._username , repoData)
      .subscribe(
        (branch) => {
          this.saveBranches(repoData, branch);
        },
        (error) => { console.log(error);}
      )
  }
  public saveBranches( repoData: iGitRepo , branch: {}){
    this.collectedRepo.push({name: repoData.name, login: repoData.login, branches: branch});
  }
  public clearCollectedRepo(){
    this.collectedRepo = [];
    this.repoPage = 1;
  }
  public nextCollectRepo(){
    this.repoPage++;
    this.collectRepo(this._username);
  }
  public setUsername(username: string){
    this._username = username;
  }
}
