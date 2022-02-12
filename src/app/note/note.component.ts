import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Note } from './note';
import { NoteService } from './noteService';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../log-in/userService';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  public notes: Note[]=[];
  public note!: FormGroup;
  public updatenote!: Note;
  private favorite:boolean = true;
  public userID!: number;

  constructor(private noteService: NoteService, private userService: UserService ,public modal:NgbModal) { 
    this.userID= this.userService.getUserID();
  }

  ngOnInit(){   
    this.getNotes(this.userID);
    this.note= new FormGroup({
      id: new FormControl(' '),
      userId:new FormControl(' '),
      title:new FormControl(' '),
      text:new FormControl(' '),
      favorite:new FormControl(' '),
      date: new FormControl(' '),
    });
  }

  public openModal(modal:any, note:Note):void{
    this.updatenote= note;
    console.log(this.updatenote);
    this.modal.open(modal)
  }

  public getNotes(userID: number): void{
    this.noteService.getNotes(userID).subscribe(
      (response: Note[])=>(this.notes=response),
      (error: HttpErrorResponse)=>{console.log(error.message)}
    )

  }

  public deleteNote(note: Note): void{
    this.noteService.deleteNote(note.id).subscribe((response:string)=>{console.log("Deleted note");
                                                    this.getNotes(this.userID);}),
                                                  (error: HttpErrorResponse)=>{console.log(error.message);};
  }

  public onAddNote(addForm: NgForm): void{
    this.noteService.addNote(addForm.value).subscribe((response:Note)=>{console.log("Added note:");
                                                      console.log(response);
                                                      this.getNotes(this.userID);
                                                      document.getElementById("btn-close-addNote")?.click();
                                                      addForm.reset()}),
                                                      (error: HttpErrorResponse)=>{console.log(error.message);
                                                      addForm.reset()};
  }

  public onUpdateNote(noteForm: NgForm): void{
    this.noteService.updateNote(noteForm.value).subscribe((response: Note)=>{console.log("Updated note:");
                                                            console.log(response);
                                                            this.getNotes(this.userID);
                                                            document.getElementById("btn-close-updateNote")?.click();}),
                                                          (error: HttpErrorResponse)=>{console.log(error.message);};
  }

  public onOnlyFavorites(): void{
    
    if(this.favorite==true){
      this.noteService.getFavoriteNotes(this.userID).subscribe((response: Note[])=> {this.notes=response},
                                                    (error:HttpErrorResponse)=>{console.log(error.message);});
      this.favorite=false;
    }else{
      this.getNotes(this.userID);
      this.favorite=true;
    }
  }

  public searchNotes(key: string): void{
    const results: Note[]= [];
    for(const note of this.notes){
      if(note.title.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1 || 
         note.text.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) !== -1){
        results.push(note);
      }
    }

    this.notes= results;
    if(results.length ==0 || !key){
      this.getNotes(this.userID);
    }
  }

}
