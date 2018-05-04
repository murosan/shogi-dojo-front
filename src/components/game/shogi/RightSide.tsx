import * as React from 'react';
import Clock from './Clock';
import { GameData } from '../../../modules/types';

interface Props {
  gameData: GameData;
  isReversed: boolean;
}

export default class SideRight extends React.Component<Props, {}> {
  render() {
    const g = this.props.gameData;
    const player = this.props.isReversed ? g.player1 : g.player0;
    const time = this.props.isReversed ? g.remainingTime1 : g.remainingTime0;

    return (
      <div className={'side sideRight'}>
        <div className={'container'}>
          <div className={'kifArea'}>
            <div className={'kif'}>
              <span className={'number'}>0 :</span>
              <span>開始局面</span>
            </div>
          </div>
          <div className={'playerInfo playerInfoRight'}>
            <div>{player.userName}</div>
            <Clock remain={time} seconds={g.seconds} />
          </div>
        </div>
        <div className={'captureStage captureStageRight'} />
      </div>
    );
  }
}
