import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  news = [];
  topics = [];
  currentTopic;
  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private router: Router


  ) {
    // localStorage.removeItem('following');  
  
    if (localStorage.getItem('following')) {
      let topics = localStorage.getItem('following');
      this.topics = topics.split(',');
      // this.getTopicNews(this.topics[0]);
      this.currentTopic = this.topics[0];
      console.log(this.topics.length);
      if (this.topics.length > 0) {
        console.log('get news')
        this.getTopicNews(this.topics[0]);
      }
  
    }
  }

  async addTopic() {
    const alert = await this.alertController.create({
      header: 'Add Topic',
      message: 'Enter a topic you interested',
      inputs: [
        {
          name: 'topic',
          type: 'text',
          placeholder: ''
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if (data.topic) {
              this.topics.push(data.topic);
              this.getTopicNews(data.topic);
              this.updateFollowing();
              setTimeout(() => {
                this.currentTopic = data.topic;
              }, 2000);
            } else {
              this.showalert('Enter a topic');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  showalert(message) {
    alert(message);
  }

  selectTopic(evt) {
    console.log(evt.target.value)
    if (evt.target.value) {
      this.getTopicNews(evt.target.value);
      this.currentTopic = evt.target.value;
    }

  }

  getTopicNews(topic) {
    this.http.get(`https://newsapi.org/v2/everything?q=${topic}&apiKey=b9f01adf9bd9451ba09f8ef0a8c979ba`)
      .subscribe((news: any) => {
        console.log(news);
        this.news = news.articles;
      }, (err)=>{
        alert('News API is down')
      });
  }

  async deleteTopic() {

    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Delete topic',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Delete',
          handler: () => {

            const index = this.topics.indexOf(this.currentTopic);
            this.topics.splice(index, 1);
            this.updateFollowing();
            if (this.topics.length >= 1) {
              this.refreshView();
        
            } else {
              this.news = [];
              this.currentTopic = '';
            }
          }
        }
      ]
    })
    await alert.present();



  }

  updateFollowing(){
    let values = JSON.stringify(this.topics);
    let u = values.substring(1, values.length - 1);
    u = u.replace(/"/g, "");

    localStorage.setItem('following', u);
  }

  refreshView() {
    this.currentTopic = this.topics[0];
    this.getTopicNews(this.currentTopic);

  }
  open(news) {
    let navigationExtras: NavigationExtras = {
      state: {
        news: news
      }
    };
    this.router.navigate(['/news-item'], navigationExtras);
  }
}

