import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DjmainhomePage } from './djmainhome.page';

describe('DjmainhomePage', () => {
  let component: DjmainhomePage;
  let fixture: ComponentFixture<DjmainhomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DjmainhomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DjmainhomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
