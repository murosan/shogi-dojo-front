import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TabBar from '../util/TabBar';
import UserList from './user-list/UserList';
import GamePage from '../game/GamePage';
import { GameData, UserInfo, GameConf } from '../../modules/types';
import socket from '../../modules/socket-client';
socket.on('connect', () => console.log('socket.io connected'));
socket.on('disconnect', () => socket.close());

interface PageInfo {
  tabName: string;
  gameData: GameData;
}

interface PageControllerState {
  displayIndex: number;
  pages: Array<PageInfo>;
  myUserInfo: UserInfo | null;
  games: Array<GameData>;
  sittingUsers: Array<UserInfo>;
  users: Array<UserInfo>;
  gameConf: undefined | GameConf;
}

class PageController extends React.Component<{}, PageControllerState> {
  constructor(props: object) {
    super(props);
    this.state = {
      displayIndex: 0,
      pages: [],
      myUserInfo: null,
      games: [],
      sittingUsers: [],
      users: [],
      gameConf: undefined,
    };
  }

  render() {
    const dispIndex = this.state.displayIndex;
    const pageNames = this.state.pages.map((p: PageInfo) => p.tabName);
    pageNames.unshift('将棋道場');
    const pages = this.state.pages.map((p: PageInfo, i: number) => {
      const me = this.state.myUserInfo;
      if (me) {
        return (
          <GamePage
            key={`game-page${i + 1}`}
            displayIndex={dispIndex}
            tabIndex={i + 1}
            gameData={p.gameData}
            myUserInfo={me}
          />
        );
      }
    });
    return (
      <div className={'pageController'}>
        <TabBar
          displayIndex={dispIndex}
          pageNames={pageNames}
          changeTabIndex={(i: number) => this.setState({ displayIndex: i })}
        />
        <UserList
          isHidden={this.state.displayIndex !== 0}
          myUserInfo={this.state.myUserInfo}
          games={this.state.games}
          sittingUsers={this.state.sittingUsers}
          users={this.state.users}
          gameConf={this.state.gameConf}
          gameStart={(g: GameData) => this.startGame(g)}
          clearGameConf={() => this.setState({ gameConf: undefined })}
        />
        {pages}
      </div>
    );
  }

  startGame(game: GameData) {
    this.setState({
      displayIndex: this.state.pages.length + 1,
      pages: this.state.pages.concat({ tabName: 'game-test', gameData: game }),
    });
  }

  componentDidMount() {
    socket.on('my_info', (u: UserInfo) => this.setState({ myUserInfo: u }));
    socket.emit('get_my_info');

    socket.on('user_list', (updated: Array<Array<string>>) => {
      const sitting: Array<UserInfo> = updated[0].map(s => JSON.parse(s));
      const games: Array<GameData> = updated[1].map(s => JSON.parse(s));
      const users: Array<UserInfo> = updated[2].map(s => JSON.parse(s));
      this.setState({
        sittingUsers: sitting,
        games: games,
        users: users,
      });
    });

    socket.on('challenged', (gameConf: GameConf) => {
      this.setState({ gameConf: gameConf });
    });
  }
}

// ---------
ReactDOM.render(<PageController />, document.getElementById('shogi'));
