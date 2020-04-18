import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SourceNewsPageRoutingModule } from './source-news-routing.module';

import { SourceNewsPage } from './source-news.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SourceNewsPageRoutingModule
  ],
  declarations: [SourceNewsPage]
})
export class SourceNewsPageModule {}
