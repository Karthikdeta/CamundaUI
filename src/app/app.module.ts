import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { FileInformationComponent } from './file-information/file-information.component';
import { AppRootComponent } from './app-root/app-root.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FileInformationComponent,
    AppRootComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgbNavModule,
    AgGridModule,
    FormsModule  
  ],
  providers: [],
  bootstrap: [AppRootComponent]
})
export class AppModule { }
