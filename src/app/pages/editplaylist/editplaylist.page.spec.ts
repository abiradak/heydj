import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditplaylistPage } from './editplaylist.page';

describe('EditplaylistPage', () => {
  let component: EditplaylistPage;
  let fixture: ComponentFixture<EditplaylistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditplaylistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditplaylistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
