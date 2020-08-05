import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatePortfolioPage } from './create-portfolio.page';

describe('CreatePortfolioPage', () => {
  let component: CreatePortfolioPage;
  let fixture: ComponentFixture<CreatePortfolioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePortfolioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePortfolioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
