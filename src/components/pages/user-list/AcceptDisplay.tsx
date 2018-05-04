import * as React from 'react';
import { GameConf, GameData } from '../../../modules/types';
import socket from '../../../modules/socket-client';

interface Props {
  isHidden: boolean;
  gameConf: GameConf;
  onFinished: () => void;
  onApproved: (g: GameData) => void;
}

interface State {
  receiveGameStart: (g: GameData) => void;
  onCanceled: (g: GameData) => void;
}

export default class AcceptDisplay extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      receiveGameStart: (g: GameData) => {
        console.log('game_start', g);
        this.props.onApproved(g);
        this.close();
      },
      onCanceled: (g: GameData) => {
        if (this.props.gameConf.gameId === g.gameId) {
          this.close();
        }
      },
    };
  }

  render() {
    return (
      <div className={this.props.isHidden ? 'cover hidden' : 'cover'}>
        <div className={'whiteBack'}>
          <div className={'notice noticeGreen'}>対局を申し込まれました。</div>

          <div className={'oppositePlayerName'}>
            {this.props.gameConf.opponent.userName}
          </div>

          <div className={'gameConf'}>
            <span>持ち時間</span>
            <span className={'emphasis'}>{this.props.gameConf.minutes}</span>
            <span>分</span>
          </div>

          <div className={'gameConf'}>
            <span>秒読み</span>
            <span className={'emphasis'}>{this.props.gameConf.seconds}</span>
            <span>秒</span>
          </div>

          <div className={'gameConf'}>
            <span>手合割</span>
            <span className={'emphasis'}>{this.props.gameConf.handicap}</span>
          </div>

          <button
            className={'btnApply'}
            onClick={() => this.emitApproveCommand()}
          >
            対局開始
          </button>

          <button
            className={'btnDanger'}
            onClick={() => this.emitRefuseCommand()}
          >
            断る
          </button>
        </div>
      </div>
    );
  }

  emitRefuseCommand() {
    socket.emit('refuse', this.props.gameConf.opponent);
    this.close();
  }

  emitApproveCommand() {
    socket.emit('game_start', this.props.gameConf);
    socket.on('game_start', this.state.receiveGameStart);
  }

  componentDidMount() {
    socket.on('canceled', this.state.onCanceled);
  }

  close() {
    socket.off('canceled', this.state.onCanceled);
    socket.off('game_start', this.state.receiveGameStart);
    this.props.onFinished();
  }
}
