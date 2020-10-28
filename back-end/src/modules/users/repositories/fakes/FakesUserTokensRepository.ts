import { uuid } from 'uuidv4';

import IUserTokensRepository from '@modules/users/repositories/IUsersTokensRepository';

import User from '@modules/users/infra/typeorm/entities/User';
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

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userToken.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }
}

export default FakeUserTokenRepository;
