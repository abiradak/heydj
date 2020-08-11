import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfitPage } from './profit.page';

describe('ProfitPage', () => {
  let component: ProfitPage;
  let fixture: ComponentFixture<ProfitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
