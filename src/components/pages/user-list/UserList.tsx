import * as React from 'react';
import MatchDisplay from './MatchInfo';
import UserData from './UserData';
import ApplyDisplay from './ApplyDisplay';
import AcceptDiaplay from './AcceptDisplay';
import {
  UserInfo,
  MatchData,
  GameData,
  GameConf,
} from '../../../modules/types';
import socket from '../../../modules/socket-client';

interface Props {
  isHidden: boolean;
  myUserInfo: UserInfo | null;
  games: Array<GameData>;
  sittingUsers: Array<UserInfo>;
  users: Array<UserInfo>;
  gameConf: undefined | GameConf;
  gameStart: (game: GameData) => void;
  clearGameConf: () => void;
}

interface State {
  waitingForGame: boolean;
  applying: boolean;
}

export default class UserList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      waitingForGame: false,
      applying: false,
    };
  }

  render() {
    const r = this.props.myUserInfo;
    if (r && this.state.applying) {
      const s = this.props.sittingUsers.filter(u => u.userId !== r.userId);
      return (
        <ApplyDisplay
          isHidden={this.props.isHidden}
          opponents={s}
          onFinished={() => this.setState({ applying: false })}
          onApproved={(g: GameData) => this.props.gameStart(g)}
        />
      );
    } else if (r && this.props.gameConf) {
      return (
        <AcceptDiaplay
          isHidden={this.props.isHidden}
          gameConf={this.props.gameConf}
          onFinished={() => this.props.clearGameConf()}
          onApproved={(g: GameData) => this.props.gameStart(g)}
        />
      );
    } else {
      const sittingUsers = this.props.sittingUsers.map(
        (user: UserInfo, i: number) => {
          return this.renderMatchInfo(`sitting${user.userId}_${i}`, {
            gameId: '-1',
            player1: user,
            player2: null,
          });
        },
      );

      const games = this.props.games.map((g: GameData, i: number) => {
        return this.renderMatchInfo(`game${i}`, {
          gameId: g.gameId,
          player1: g.player0 || null,
          player2: g.player1 || null,
        });
      });

      const allUsers = this.props.users.map((user: UserInfo, i: number) => {
        return <UserData key={`user${i}`} user={user} />;
      });

      return (
        <div className={this.props.isHidden ? 'userList hidden' : 'userList'}>
          <div className={'btnContainer'}>
            {this.renderSitButton()}
            <div />
            {this.renderApplyButton()}
          </div>
          {sittingUsers}
          {games}
          <div className={'users'}>
            <div className={'user header'}>
              <div className={'data'}>{'名前'}</div>
              <div className={'data'}>{'棋力'}</div>
              <div className={'data'}>{'勝ち'}</div>
              <div className={'data'}>{'負け'}</div>
            </div>
            {allUsers}
          </div>
        </div>
      );
    }
  }

  renderSitButton() {
    const com = this.state.waitingForGame ? 'stand_up' : 'sit';
    const text = this.state.waitingForGame
      ? '対局待ちを解除'
      : '対局待ちにする';

    return (
      <button
        className={'btnNotice'}
        onClick={() => {
          socket.emit(com, '');
          this.setState({ waitingForGame: !this.state.waitingForGame });
        }}
      >
        {text}
      </button>
    );
  }

  renderApplyButton() {
    const len = this.props.sittingUsers.length;
    const w = this.state.waitingForGame;

    if ((w && len - 1 > 0) || (!w && len > 0)) {
      return (
        <button
          className={'btnNotice'}
          onClick={() => this.setState({ applying: true })}
        >
          対局を申し込む
        </button>
      );
    } else {
      return <button className={'btnDisable'}>対局を申し込む</button>;
    }
  }

  renderMatchInfo(key: string, info: MatchData) {
    return <MatchDisplay key={key} info={info} />;
  }
}
