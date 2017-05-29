import {
  inject,
  TestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HomeService } from './home.service';

describe('HomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseRequestOptions,
      MockBackend,
      {
        provide: Http,
        useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
      HomeService
    ]}));

  it('should have http', inject([ HomeService ], (homeService: HomeService) => {
    expect(!!homeService.http).toEqual(true);
  }));

  it('should get data from the server', inject([ HomeService ], (homeService: HomeService) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    homeService.getData();
    expect(console.log).toHaveBeenCalled();
    expect(homeService.getData()).toEqual({ value: 'AngularClass' });
  }));

});
