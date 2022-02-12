import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { User } from './user';
import { UserService } from './userService';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit{
  @Input() dataEmit:any;
  public users: User[]=[];
  public user!: FormGroup;
  private userID!: number;

  constructor(private userService: UserService, public modal:NgbModal){}

  ngOnInit(){
    this.user = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  public getUsers(): void{
    this.userService.getUsers().subscribe(
      (response: User[])=>{this.users=response;},
      (error: HttpErrorResponse)=>{alert(error.message)})
  }

public onAddUser(addForm: NgForm): void{
  document.getElementById("add-user-form")?.click();
  this.userService.addUser(addForm.value).subscribe((response: User)=>{console.log(response);
                                                    this.getUsers();
                                                    addForm.reset()},
                                                    (error: HttpErrorResponse)=>{alert(error.message);
                                                      addForm.reset();});
}

public onUpdateUser(user: User): void{
  document.getElementById("update-user-form")?.click();
  
  this.userService.updateUser(user).subscribe((response: User)=>{console.log(response);
                                                    this.getUsers();},
                                                    (error: HttpErrorResponse)=>{alert(error.message)});
}

public onDeleteUser(userId: number): void{
  document.getElementById("delete-user-form")?.click();
  this.userService.deleteUser(userId).subscribe((response: string)=>{console.log(response);
                                                    this.getUsers();},
                                                    (error: HttpErrorResponse)=>{alert(error.message),
                                                    this.getUsers();});
                                                    
}
public onLogInUser(user: FormGroup): void{
  this.userService.loginUser(user.get('email')?.value,user.get('password')?.value).subscribe((response: number)=>{
                                                  if(response>0){
                                                    this.userID= response;
                                                    this.userService.setUserID(this.userID)
                                                    document.getElementById("logInButton")?.click();
                                                  };},                                           
                                                    (error: HttpErrorResponse)=>{alert(error.message);
                                                    });
                                                    
}

/*routerLink="/note/{user.email}
[routerLink]="['/','note', userID]"
"onOpenModal(null!, 'add')"
*/

public searchUsers(key: string): void{
  const results: User[]= [];
  for(const user of this.users){
    if(user.email.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1){
      results.push(user);
    }
  }

  this.users= results;
  if(results.length ==0 || !key){
    this.getUsers();
  }
}

}
