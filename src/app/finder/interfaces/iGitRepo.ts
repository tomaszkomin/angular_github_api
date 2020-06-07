export interface iGitRepo {
  name:string ,
  login:string,
  fork?: boolean,
  owner?: {
    login?: string
  }
}
