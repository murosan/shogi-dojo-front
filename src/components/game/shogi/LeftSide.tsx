import * as React from 'react';
import Clock from './Clock';
import { GameData } from '../../../modules/types';

interface Props {
  gameData: GameData;
  isReversed: boolean;
}

export default class SideLeft extends React.Component<Props, {}> {
  render() {
    const g = this.props.gameData;
    const player = this.props.isReversed ? g.player0 : g.player1;
    const time = this.props.isReversed ? g.remainingTime0 : g.remainingTime1;

    return (
      <div className={'side sideLeft'}>
        <div className={'captureStage captureStageLeft'} />
        <div className={'container'}>
          <div className={'playerInfo playerInfoLeft'}>
            <div>{player.userName}</div>
            <Clock remain={time} seconds={g.seconds} />
          </div>
          {this.renderButtons()}
        </div>
      </div>
    );
  }

  renderButtons() {
    if (this.props.gameData.isPlaying) {
      return <div className={'btnArea'} />;
    } else {
      return (
        <div className={'btnArea'}>
          <button>＜</button>
          <button>＞</button>
          <button>＜5</button>
          <button>5＞</button>
          <button>＜＜</button>
          <button>＞＞</button>
          <button className={'reverse'}>盤面反転</button>
          <button className={'copy'}>棋譜コピー</button>
        </div>
      );
    }
  }
}
