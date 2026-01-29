import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapExplorerPage } from './map-explorer.page';

describe('MapExplorerPage', () => {
  let component: MapExplorerPage;
  let fixture: ComponentFixture<MapExplorerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MapExplorerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
