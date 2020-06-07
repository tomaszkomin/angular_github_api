import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../../../../../environments/environment'

import { iGitRepo } from './../../../interfaces/iGitRepo';
import * as parser from 'parse-link-header';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private _connectionString:string = environment.GITHUB_CONNECTION_STRING;
  private _reposLimit = ++environment.GITHUB_REPOS_LIMIT;
  private _parseLinkHeader = parser;
  constructor( private http: HttpClient ) { }

  public getReposNotForked( name: string , page:Number = 1, limit:number = this._reposLimit ) :Observable<iGitRepo[]> {
    if(!name) return;

    const params = `?page=${page}&per_page=${limit}&isFork=false`
    const url =  `${this._connectionString}users/${name}/repos${params}`;

    const sub = this.http.get<[]>(url)
      .pipe(map(results =>
         {
            return results.filter((result: iGitRepo) => !result.fork)
                .map((result: iGitRepo ) => {
                  return {
                    name: result.name,
                    login: result.owner.login
                }})
              }
      ),shareReplay())
      return sub;
  }
  public getReposMetaData(name: string , page:Number = 1, limit:number = this._reposLimit ){
    if(!name) return;
    const params = `?page=${page}&per_page=${limit}&isFork=false`
    const url =  `${this._connectionString}users/${name}/repos${params}`;
    const sub = this.http.head<[]>(url,{ observe: 'response' }).pipe(map(results => {
          let parsed = this._parseLinkHeader(results.headers.get('link'))
          return parsed;
        }
      ),shareReplay());
      return sub;

  }
  public getBranches(username: string, repo: iGitRepo) :Observable<any[]> {
    const {name} = repo;
    if( (!username) || (!name)) return;
    const url = `${this._connectionString}repos/${username}/${name}/branches`;

    const sub = this.http.get<any[]>(url)
    return sub;
  }
}
