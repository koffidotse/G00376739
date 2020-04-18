import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'news-item',
    loadChildren: () => import('./news-item/news-item.module').then( m => m.NewsItemPageModule)
  },
  {
    path: 'source-news',
    loadChildren: () => import('./source-news/source-news.module').then( m => m.SourceNewsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
