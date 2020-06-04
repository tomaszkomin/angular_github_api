import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap,map, subscribeOn } from 'rxjs/operators';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
const GITHUB_CONNECTION_STRING = 'https://api.github.com/';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private _connectionString = GITHUB_CONNECTION_STRING;
  private _repoData;
  constructor( private http: HttpClient ) { }

  getRepos( name:string ){
    const url =  `${GITHUB_CONNECTION_STRING}users/${name}/repos`;
    const sub = this.http.get<any>(url)
      .pipe(
        map( results =>  {
            const names = results.map((result:any) => {return result.name})
            return names;
        }
      ))
    return sub;
  }
}
