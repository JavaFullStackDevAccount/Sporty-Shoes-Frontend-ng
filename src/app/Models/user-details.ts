export class User {
  id: number = 0;
  userName: string = '';
  userEmail: string = '';
  isAdmin: boolean = false;
  
  constructor(userName: string, userEmail: string, isAdmin: boolean) {
    this.userName = userName;
    this.userEmail = userEmail;
    this.isAdmin = isAdmin;
  }

  setUserEmail(userEmail:string){
    this.userEmail = userEmail
  }

  setUserId(userId:number){
    this.id = userId
  }

  setUserIsAdmin(isAdmin:boolean){
    this.isAdmin = isAdmin
  }

}
