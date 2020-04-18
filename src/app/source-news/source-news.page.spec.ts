import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SourceNewsPage } from './source-news.page';

describe('SourceNewsPage', () => {
  let component: SourceNewsPage;
  let fixture: ComponentFixture<SourceNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceNewsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SourceNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
