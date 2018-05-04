import * as React from 'react';
import { UserInfo } from '../../../modules/types';

export default class UserData extends React.Component<{ user: UserInfo }, {}> {
  render() {
    return (
      <div className={'user'}>
        <div className={'data'}>{this.props.user.userName}</div>
        <div className={'data'}>{this.props.user.rank}</div>
        <div className={'data'}>{this.props.user.wins}</div>
        <div className={'data'}>{this.props.user.defeats}</div>
      </div>
    );
  }
}
