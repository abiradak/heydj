import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NowplayPage } from './nowplay.page';

describe('NowplayPage', () => {
  let component: NowplayPage;
  let fixture: ComponentFixture<NowplayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NowplayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NowplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
