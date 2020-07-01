import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditlistenerprofilePage } from './editlistenerprofile.page';

describe('EditlistenerprofilePage', () => {
  let component: EditlistenerprofilePage;
  let fixture: ComponentFixture<EditlistenerprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditlistenerprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditlistenerprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
