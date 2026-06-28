import { TestBed } from '@angular/core/testing';

import { UserList } from './user-list';

describe('UserList', () => {
  let service: UserList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
