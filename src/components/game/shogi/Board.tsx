import * as React from 'react';
import RowContainer from './RowContainer';
import { GameData } from '../../../modules/types';

interface Props {
  gameData: GameData;
  indexes: Array<number>;
  isReversed: boolean;
  myTurn: 0 | 1;
}

export default class Board extends React.Component<Props, {}> {
  render() {
    const rows = this.props.indexes.map(r => {
      return (
        <RowContainer
          key={`rowContainer${r}`}
          gameData={this.props.gameData}
          indexes={this.props.indexes}
          isReversed={this.props.isReversed}
          myTurn={this.props.myTurn}
          row={r}
        />
      );
    });
    return <div className="board">{rows}</div>;
  }
}
