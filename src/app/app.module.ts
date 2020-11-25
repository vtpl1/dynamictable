import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ApiModule } from './swagger/api.module';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { TableFilterDemo } from './primeng/table-filter-demo/table-filter-demo.component';

import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

import { AccordionModule } from 'primeng/accordion'; //accordion and accordion tab
import { MenuItem } from 'primeng/api'; //api

@NgModule({
  declarations: [AppComponent, TableComponent, TableFilterDemo],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ApiModule,
    HttpClientModule,

    ButtonModule,
    RadioButtonModule,
    InputSwitchModule,
    InputTextModule,
    TableModule,
    DialogModule,
    TooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
