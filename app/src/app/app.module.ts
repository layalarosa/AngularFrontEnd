import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { PersonasComponent } from './personas/personas.component'; // Declaracion del Componente
import { PersonaDetailComponent } from './persona-detail/persona-detail.component' // <-- NgModel lives here
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { PersonaSearchComponent } from './persona-search/persona-search.component';

// Componentes Creados Aqui es que se llaman lo Componentes 
import { AppRoutingModule } from './app-routing.module';// Routing buscar inf
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { TableComponent } from './table/table.component';
import { PagingComponent } from './paging/paging.component';

// declarar formModule es Importante para que los input funcionen correcta mente
import { FormsModule } from '@angular/forms';
import { GetDemoComponent } from './gets/get-demo/get-demo.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SearchComponent,
    TableComponent,
    PagingComponent,
   
    PersonasComponent,
    PersonaDetailComponent,
    MessagesComponent,
    DashboardComponent,
    
    PersonaSearchComponent,
    GetDemoComponent

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.

    // El módulo HttpClientInMemoryWebApiModule intercepta solicitudes // HTTP
    // y devuelve respuestas de servidor simuladas.
    // Eliminarlo cuando un servidor real esté listo para recibir solicitudes.

    HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false }),
    BrowserAnimationsModule,
    RouterModule.forRoot([
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
