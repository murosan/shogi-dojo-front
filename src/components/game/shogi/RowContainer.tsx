import * as React from 'react';
import Edge from './Edge';
import Piece from './Piece';
import { GameData } from '../../../modules/types';

interface Props {
  gameData: GameData;
  indexes: Array<number>;
  isReversed: boolean;
  row: number;
  myTurn: 0 | 1;
}

export default class RowContainer extends React.Component<Props, {}> {
  render() {
    const r = this.props.row;
    const cells = this.props.indexes.map(c => {
      const isEdge = r === -1 || r === 9 || c === -1 || c === 9;
      if (isEdge) {
        return <Edge key={`edge${r}${c}`} row={r} col={c} />;
      } else {
        return (
          <Piece
            key={`piece${r}${c}`}
            gameData={this.props.gameData}
            isReversed={this.props.isReversed}
            myTurn={this.props.myTurn}
            row={r}
            col={c}
          />
        );
      }
    });

    return <div className={'rowContainer'}>{cells}</div>;
  }
}
