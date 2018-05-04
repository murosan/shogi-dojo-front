import * as React from 'react';
import Selector from '../../util/Selector';
import ButtonClose from '../../util/CloseButton';
import { UserInfo, GameData } from '../../../modules/types';
import socket from '../../../modules/socket-client';

interface Props {
  isHidden: boolean;
  opponents: Array<UserInfo>;
  onFinished: () => void;
  onApproved: (g: GameData) => void;
}

interface State {
  opponent: UserInfo;
  mimutes: number;
  seconds: number;
  handicap: string;
  applying: boolean;
  refused: undefined | string;
  onRefused: (n: number) => void;
  receiveGameStart: (g: GameData) => void;
}

export default class ApplyDisplay extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      opponent: props.opponents[0],
      mimutes: 15,
      seconds: 60,
      handicap: '平手',
      applying: false,
      refused: undefined,
      onRefused: (n: number) => {
        if (!this.state.refused) {
          this.setState({ refused: '断られました' });
        }
      },
      receiveGameStart: (g: GameData) => {
        console.log('game_start', g);
        this.close();
        this.props.onApproved(g);
      },
    };
  }

  render() {
    const cls = this.props.isHidden ? 'cover hidden' : 'cover';
    if (this.state.refused) {
      return (
        <div className={cls}>
          <div className={'whiteBack'}>
            <div className={'notice noticeRed'}>{this.state.refused}</div>
          </div>
          <ButtonClose clicked={() => this.close()} />
        </div>
      );
    } else if (this.state.applying) {
      return (
        <div className={cls}>
          <div className={'whiteBack'}>
            <div className={'notice noticeGreen'}>
              対局を申し込みました。少々お待ちください。
            </div>
            <button className={'btnDanger'} onClick={() => this.cancelGame()}>
              キャンセル
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className={cls}>
          <div className={'whiteBack'}>
            {this.renderOpponentSelector()}
            {this.renderMinuteSelector()}
            {this.renderSecondsSelector()}
            {this.renderHandicapSelector()}

            <button className={'btnApply'} onClick={() => this.applyGame()}>
              申し込む
            </button>
          </div>

          <ButtonClose clicked={() => this.close()} />
        </div>
      );
    }
  }

  renderOpponentSelector() {
    return (
      <div className={'gameConf'}>
        <span>対戦相手</span>
        <Selector
          options={this.props.opponents}
          default={this.state.opponent}
          extraClassName={'selectorOpponent'}
          htmlTabIndex={1}
          value={(u: UserInfo) => this.setState({ opponent: u })}
        />
      </div>
    );
  }

  renderMinuteSelector() {
    return (
      <div className={'gameConf'}>
        <span>持ち時間</span>
        <Selector
          options={[0, 1, 5, 10, 15, 20, 25, 30, 60]}
          default={this.state.mimutes}
          extraClassName={'selectorTime'}
          htmlTabIndex={1}
          value={(n: number) => this.setState({ mimutes: n })}
        />
        <span>分</span>
      </div>
    );
  }

  renderSecondsSelector() {
    return (
      <div className={'gameConf'}>
        <span>秒読み</span>
        <Selector
          options={[10, 20, 30, 40, 50, 60]}
          default={this.state.seconds}
          extraClassName={'selectorTime'}
          htmlTabIndex={2}
          value={(n: number) => this.setState({ seconds: n })}
        />
        <span>秒</span>
      </div>
    );
  }

  renderHandicapSelector() {
    return (
      <Selector
        options={[
          '平手',
          '香落ち',
          '角落ち',
          '飛車落ち',
          '二枚落ち',
          '四枚落ち',
          '六枚落ち',
          '八枚落ち',
          '十枚落ち',
        ]}
        default={this.state.handicap}
        extraClassName={'selectorHandicap'}
        htmlTabIndex={3}
        value={(s: string) => this.setState({ handicap: s })}
      />
    );
  }

  applyGame() {
    this.setState({ applying: true });
    socket.emit('apply_game', {
      opponent: this.state.opponent,
      minutes: this.state.mimutes,
      seconds: this.state.seconds,
      handicap: this.state.handicap,
    });

    socket.on('refused', this.state.onRefused);
    socket.on('game_start', this.state.receiveGameStart);
  }

  cancelGame() {
    socket.emit('cancel_game', {
      opponent: this.state.opponent,
      minutes: this.state.mimutes,
      seconds: this.state.seconds,
      handicap: this.state.handicap,
    });
    this.close();
  }

  close() {
    socket.off('refused', this.state.onRefused);
    socket.off('game_start', this.state.receiveGameStart);
    this.props.onFinished();
  }
}
