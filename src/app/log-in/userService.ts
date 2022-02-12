import { EventEmitter, Injectable, Output } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { User } from "./user";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class UserService{

    private apiServiceUrl=environment.apiBaseUrl;
    private userID!:number;

    constructor(private http: HttpClient){ }

    public getUsers():Observable<User[]>{
        return this.http.get<User[]>(`${this.apiServiceUrl}/services/user`);
    }

    public addUser(user : User):Observable<User>{
        return this.http.post<User>(`${this.apiServiceUrl}/services/user/add`, user);
    }

    public updateUser(user : User):Observable<User>{
        return this.http.put<User>(`${this.apiServiceUrl}/services/user/update/${user.id}`, user);
    }

    public deleteUser(userId : number):Observable<string>{
        return this.http.delete<string>(`${this.apiServiceUrl}/services/user/delete/${userId}`);
    }

    //    //pasarlo por header o body
    // TODO cambiar el endpoint logIn a login , y date en el back hacerlo .tostrign
    public loginUser(email: string, password: string):Observable<number>{
        return this.http.get<number>(`${this.apiServiceUrl}/services/user/logIn/${email}/${password}`);
    }

    public setUserID(userID: number): void{
        this.userID= userID;
    }
    public  getUserID(): number{
        return this.userID;
    }
}