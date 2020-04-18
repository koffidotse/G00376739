import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsItemPage } from './news-item.page';

describe('NewsItemPage', () => {
  let component: NewsItemPage;
  let fixture: ComponentFixture<NewsItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
