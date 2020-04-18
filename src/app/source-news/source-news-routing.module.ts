import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SourceNewsPage } from './source-news.page';

const routes: Routes = [
  {
    path: '',
    component: SourceNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SourceNewsPageRoutingModule {}
