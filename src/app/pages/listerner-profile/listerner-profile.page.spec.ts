import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListernerProfilePage } from './listerner-profile.page';

describe('ListernerProfilePage', () => {
  let component: ListernerProfilePage;
  let fixture: ComponentFixture<ListernerProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListernerProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListernerProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
