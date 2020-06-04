import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
const GITHUB_CONNECTION_STRING = 'https://api.github.com/';

export interface iRepo {
  name:string , fork: boolean
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private _connectionString = GITHUB_CONNECTION_STRING;
  private _repoData;
  constructor( private http: HttpClient ) { }

  public getReposNotForked( name: string ) :Observable<string[]> {
    const url =  `${GITHUB_CONNECTION_STRING}users/${name}/repos`;

    const sub = this.http.get<[]>(url)
      .pipe( map( results =>
          results.filter((result: iRepo) => !result.fork) //filter out forked
                 .map( ( result: iRepo ) =>result.name) //return names
      ))
    return sub;
  }
  public getBranches( username: string, repoName: string) :Observable<[]> {
    console.log(username);
    console.log(repoName);
    //if( (!username) || (!repoName)) return;
    const url = `${GITHUB_CONNECTION_STRING}repos/${username}/${repoName}/branches`;
    const sub = this.http.get<[]>(url);
    return sub;
  }
}
