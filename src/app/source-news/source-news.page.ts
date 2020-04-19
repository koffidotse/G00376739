import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-source-news',
  templateUrl: './source-news.page.html',
  styleUrls: ['./source-news.page.scss'],
})
export class SourceNewsPage implements OnInit {

  source;
  news;
  sourceName;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    public alertController: AlertController
  ) {
    // get source
    if (this.router.getCurrentNavigation().extras.state) {
      this.source = this.router.getCurrentNavigation().extras.state.source;
      this.sourceName = this.router.getCurrentNavigation().extras.state.sourceName;
    } else {
      this.router.navigateByUrl('/')
    }
  }

  ngOnInit() {
    if (this.source) {
      ///load news by source
      this.http.get(`https://newsapi.org/v2/everything?sources=${this.source}&apiKey=b9f01adf9bd9451ba09f8ef0a8c979ba`).subscribe((news: any) => {
        this.news = news.articles;
        // console.log(this.news);
        if (!news.articles.length) {
          this.presentAlertMultipleButtons();
          window.history.back();
        }
      })
    }
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: this.source,
      subHeader: 'Not Available',
      message: 'No news available from this source',
      buttons: ['OK']
    });

    await alert.present();
  }

  open(news) {
    // open new in a page
    let navigationExtras: NavigationExtras = {
      state: {
        news: news
      }
    };
    this.router.navigate(['/news-item'], navigationExtras);
  }


}
