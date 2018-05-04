import * as React from 'react';
import pieceId from '../../../modules/get-piece-id';
import { GameData } from '../../../modules/types';

interface Props {
  gameData: GameData;
  isReversed: boolean;
  myTurn: 0 | 1;
  row: number;
  col: number;
}

interface State {}

export default class Piece extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const rev = this.props.isReversed;
    const r = this.props.row;
    const c = this.props.col;
    const isMyTurn = this.props.myTurn === this.props.gameData.turn;
    const pieceNum = this.props.gameData.positions.onBoard[r][c];
    const id = pieceId(pieceNum, rev);
    const cls = ['piece', 'pieceOnBoard'];

    if (isMyTurn && this.isMyPiece(pieceNum, this.props.myTurn)) {
      cls.push('pieceTurn');
    }
    if ((rev && r === 0) || (!rev && r === 8)) {
      cls.push('pieceBottom');
    }
    if ((rev && c === 0) || (!rev && c === 8)) {
      cls.push('pieceRight');
    }
    if (this.isStar(rev, r, c)) {
      cls.push('star');
    }

    return <div id={id} className={cls.join(' ')} />;
  }

  isMyPiece(p: number, turn: 0 | 1) {
    return p !== -1 && (turn === 0 ? p < 20 : p >= 20);
  }

  isStar(rev: boolean, r: number, c: number) {
    const points = rev ? [3, 6] : [2, 5];
    return points.includes(r) && points.includes(c);
  }
}
