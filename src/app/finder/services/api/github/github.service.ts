import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

const GITHUB_CONNECTION_STRING = 'https://api.github.com/';
const GITHUB_REPOS_LIMIT = 100;

import { iGitRepo } from './../../../interfaces/iGitRepo';
import { iGitBranch} from './../../../interfaces/iGitBranch';
import { iRepo } from 'src/app/finder/interfaces/iRepo';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private _connectionString:string = GITHUB_CONNECTION_STRING;
  constructor( private http: HttpClient ) { }

  public getReposNotForked( name: string , page = 1, limit:number = GITHUB_REPOS_LIMIT ) :Observable<iGitRepo[]> {
    if(!name) return;

    const params = `?page=${page}&per_page=${limit}&isFork=false`
    const url =  `${GITHUB_CONNECTION_STRING}users/${name}/repos${params}`;

    const sub = this.http.get<[]>(url)
      .pipe(map(results =>
         results.filter((result: iGitRepo) => !result.fork) //filter out forked
                .map((result: iGitRepo ) => {
                  return {
                    name: result.name,
                    login: result.login
                }})
      ))
      return sub;
  }
  public getBranches( username: string, repo: iGitRepo) :Observable<any[]> {
    const {name} = repo;
    if( (!username) || (!name)) return;
    const url = `${GITHUB_CONNECTION_STRING}repos/${username}/${name}/branches`;

    const sub = this.http.get<any[]>(url)
    // .pipe(
    //   map((results)=> results.map((result:any) => {
    //     return (result.commit.sha);
    //   }))
    // );
    return sub;
  }
}
