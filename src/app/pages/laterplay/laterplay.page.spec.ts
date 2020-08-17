import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LaterplayPage } from './laterplay.page';

describe('LaterplayPage', () => {
  let component: LaterplayPage;
  let fixture: ComponentFixture<LaterplayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaterplayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LaterplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
