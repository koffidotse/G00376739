import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.page.html',
  styleUrls: ['./news-item.page.scss'],
})
export class NewsItemPage implements OnInit {

  news;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private socialSharing: SocialSharing,
    private actionSheetController: ActionSheetController,
    public alertController: AlertController
  ) {
    //get news
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.news = this.router.getCurrentNavigation().extras.state.news;
      } else {
        this.router.navigateByUrl('/')
      }
    });
  }

  ngOnInit() {
  }

  //share to email, sms or whatsapp
  async share() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Share',
      buttons: [{
        text: 'Email',
        icon: 'mail-outline',
        handler: () => {
          this.shareTo('email');
        }
      }, {
        text: 'SMS',
        icon: 'chatbox-outline',
        handler: () => {
          this.shareTo('sms');
        }
      },
      {
        text: 'Whatsapp',
        icon: 'logo-whatsapp',
        handler: () => {
          this.shareTo('whatsapp');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  shareTo(app) {
    let news_title = this.news.title;
    let news_body = this.news.contents;
    let news_link = this.news.url;
    let news_image = this.news.urlToImage;
    switch (app) {
      // to email
      case 'email':
        this.socialSharing.canShareViaEmail().then(() => {
          // Sharing via email is possible
          this.socialSharing.shareViaEmail(news_body, news_title, ['']).then(() => {
            // Success!
          }).catch((err) => {
            // Error!
            console.log(err)
          });
        }).catch((err) => {
          this.alertCordovaNotAvailable()

        });
        break;
      // to sms
      case 'sms':
        this.socialSharing.shareViaSMS(news_title + ' ' + news_link, '').then(() => {
        }).catch((err) => {
          this.alertCordovaNotAvailable();
        });
        break;
      // to whatsapp
      case 'whatsapp':
        this.socialSharing.shareViaWhatsApp(news_title, news_image, news_link).then(() => {
        }).catch((err) => {
          this.alertCordovaNotAvailable()
        });
        break;
      default:
        break;
    }
  }

  //show alert cordova not available
  async alertCordovaNotAvailable() {
    const alert = await this.alertController.create({
      header: '',
      subHeader: 'Not Available',
      message: 'Only for Mobile Device',
      buttons: ['OK']
    });

    await alert.present();
  }


}
