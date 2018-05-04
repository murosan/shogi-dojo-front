import * as React from 'react';
import Chat from './chat/Chat';
import PlayArea from './shogi/PlayArea';
import { GameData, UserInfo } from '../../modules/types';
import socket from '../../modules/socket-client';

interface Props {
  tabIndex: number;
  displayIndex: number;
  gameData: GameData;
  myUserInfo: UserInfo;
}

export default class GamePage extends React.Component<Props, {}> {
  render() {
    const clsName = ['gameArea'];
    if (this.props.displayIndex != this.props.tabIndex) clsName.push('hidden');

    return (
      <div className={clsName.join(' ')}>
        <PlayArea
          gameData={this.props.gameData}
          myUserInfo={this.props.myUserInfo}
          myTurn={
            this.props.gameData.player0.userId === this.props.myUserInfo.userId
              ? 0
              : 1
          }
        />
        <Chat
          gameId={this.props.gameData.gameId}
          tabIndex={this.props.tabIndex}
          displayIndex={this.props.displayIndex}
        />
      </div>
    );
  }

  componentDidMount() {
    socket.emit('join_room', this.props.gameData.gameId);
  }
}
