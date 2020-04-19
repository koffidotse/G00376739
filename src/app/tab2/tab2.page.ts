import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

@Component({
   selector: 'app-tab2',
   templateUrl: 'tab2.page.html',
   styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

   sources;
   constructor(
      private http: HttpClient,
      private router: Router

   ) { }

   ngOnInit() {
      // get all sources
      this.http.get('https://newsapi.org/v2/sources?apiKey=b9f01adf9bd9451ba09f8ef0a8c979ba').subscribe((data:any)=>{
      this.sources = data.sources;
      })
   }

// open news pahge by source
   go(id, name) {
      // window.open(url, '_blank')
      let navigationExtras: NavigationExtras = {
         state: {
            source: id,
            sourceName: name
         }
      };
      this.router.navigate(['/source-news'], navigationExtras);
   }

}
