import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DjProfilePage } from './dj-profile.page';

describe('DjProfilePage', () => {
  let component: DjProfilePage;
  let fixture: ComponentFixture<DjProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DjProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DjProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
