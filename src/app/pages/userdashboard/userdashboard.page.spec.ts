import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserdashboardPage } from './userdashboard.page';

describe('UserdashboardPage', () => {
  let component: UserdashboardPage;
  let fixture: ComponentFixture<UserdashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserdashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
