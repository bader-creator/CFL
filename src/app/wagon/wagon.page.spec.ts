import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WagonPage } from './wagon.page';

describe('WagonPage', () => {
  let component: WagonPage;
  let fixture: ComponentFixture<WagonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WagonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WagonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
