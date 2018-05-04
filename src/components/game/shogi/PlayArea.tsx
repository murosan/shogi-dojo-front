import * as React from 'react';
import Board from './Board';
import SideLeft from './LeftSide';
import SideRight from './RightSide';
import { GameData, UserInfo } from '../../../modules/types';

interface Props {
  gameData: GameData;
  myUserInfo: UserInfo;
  myTurn: 0 | 1;
}

interface State {
  indexes: Array<number>;
  isReversed: boolean;
}

export default class PlayArea extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      indexes:
        this.props.myTurn === 0
          ? [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
          : [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1],
      isReversed: this.props.myTurn === 0 ? false : true,
    };
  }

  render() {
    return (
      <div className={'playArea'}>
        <SideLeft
          gameData={this.props.gameData}
          isReversed={this.state.isReversed}
        />
        <Board
          gameData={this.props.gameData}
          indexes={this.state.indexes}
          isReversed={this.state.isReversed}
          myTurn={this.props.myTurn}
        />
        <SideRight
          gameData={this.props.gameData}
          isReversed={this.state.isReversed}
        />
      </div>
    );
  }
}
