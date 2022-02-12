import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Note } from "./note";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiServiceUrl=environment.apiNotesUrl;

  constructor(private http: HttpClient){ }

  public addNote(note : Note):Observable<Note>{
    return this.http.post<Note>(`${this.apiServiceUrl}/add`, note);
  }

  public updateNote(note : Note):Observable<Note>{
    return this.http.put<Note>(`${this.apiServiceUrl}/update/${note.id}`,note);
  }
  
  public deleteNote(noteId : string):Observable<string>{
    return this.http.delete<string>(`${this.apiServiceUrl}/delete/${noteId}`);
  }

  public SetFavoriteValue(noteId : string):Observable<string>{
    return this.http.delete<string>(`${this.apiServiceUrl}/favorite/${noteId}`);
  }

  public getNotes(userID:number):Observable<Note[]>{
    return this.http.get<Note[]>(`${this.apiServiceUrl}/user/${userID}`);
  }

  public getFavoriteNotes(userID:number):Observable<Note[]>{
    return this.http.get<Note[]>(`${this.apiServiceUrl}/user/${userID}/favorites`);
  }

  //revisar
  public getCreatedNotesOnSPecificDate(userID:number, date:Date):Observable<Note[]>{
    return this.http.get<Note[]>(`${this.apiServiceUrl}/user/${userID}/${date}`);
  }


}
