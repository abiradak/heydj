import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyplaylistPage } from './myplaylist.page';

describe('MyplaylistPage', () => {
  let component: MyplaylistPage;
  let fixture: ComponentFixture<MyplaylistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyplaylistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyplaylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
