import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';
import { NoteComponent } from './note/note.component';
import { UserService } from './log-in/userService';
import { NoteService } from './note/noteService';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    NoteComponent,
    NoteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    RouterModule.forRoot([
      {path: 'logIn', component: LogInComponent},
      {path: 'note/:id', component: NoteComponent},
      {path: '', redirectTo: '/logIn', pathMatch: 'full'},
    ]),

  ],
  providers: [UserService],
  //providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
