import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  news;
  constructor(
    private http: HttpClient,
    private router: Router

  ) {}

  ngOnInit() {
    this.http.get('https://newsapi.org/v2/top-headlines?country=ie&apiKey=b9f01adf9bd9451ba09f8ef0a8c979ba').subscribe((news:any)=>{
      this.news = news.articles;
    })
  }

  // open news in browser 
  openUrl(url){
    window.open(url, '_blank')
  }

  // open news in a page
  open(news){
   let navigationExtras: NavigationExtras = {
      state: {
        news: news
      }
    };
    this.router.navigate(['/news-item'], navigationExtras);
  }
}
