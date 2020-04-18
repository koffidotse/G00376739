import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsItemPageRoutingModule } from './news-item-routing.module';

import { NewsItemPage } from './news-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsItemPageRoutingModule
  ],
  declarations: [NewsItemPage]
})
export class NewsItemPageModule {}
