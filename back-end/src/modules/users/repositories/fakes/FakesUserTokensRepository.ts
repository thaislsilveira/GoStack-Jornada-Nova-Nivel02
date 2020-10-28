import { uuid } from 'uuidv4';

import IUserTokensRepository from '@modules/users/repositories/IUsersTokensRepository';

import UserToken from '../../infra/typeorm/entities/UserToken';

class FakeUserTokenRepository implements IUserTokensRepository {
  private userToken: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.userToken.push(userToken);

    return userToken;
  }
}

export default FakeUserTokenRepository;
