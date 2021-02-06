import { UserSchema } from './user.schema';

describe('User', () => {
  it('should be defined', () => {
    expect(new UserSchema()).toBeDefined();
  });
});
