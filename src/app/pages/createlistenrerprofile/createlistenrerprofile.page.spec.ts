import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatelistenrerprofilePage } from './createlistenrerprofile.page';

describe('CreatelistenrerprofilePage', () => {
  let component: CreatelistenrerprofilePage;
  let fixture: ComponentFixture<CreatelistenrerprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatelistenrerprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatelistenrerprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
