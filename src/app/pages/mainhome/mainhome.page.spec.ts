import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainhomePage } from './mainhome.page';

describe('MainhomePage', () => {
  let component: MainhomePage;
  let fixture: ComponentFixture<MainhomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainhomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainhomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
