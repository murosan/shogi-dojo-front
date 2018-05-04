import * as React from 'react';
import { rowString, colString } from '../../../modules/string-utils';

export interface Props {
  row: number;
  col: number;
}

export default class Edge extends React.Component<Props, {}> {
  render() {
    const row = this.props.row;
    const col = this.props.col;
    const rowIsEdge = row === -1 || row === 9;
    const colIsEdge = col === -1 || col === 9;

    if (rowIsEdge && colIsEdge) {
      return <div className={'edge edgeCorner'} />;
    } else if (rowIsEdge && !colIsEdge) {
      return this.renderHorizontal();
    } else if (!rowIsEdge && colIsEdge) {
      return this.renderVertical();
    } else {
      return <div className={'edge'} />;
    }
  }

  renderHorizontal() {
    if (this.props.row === -1) {
      return (
        <div className={'edge'}>
          <div className={'edgeText'}>{colString(this.props.col)}</div>
        </div>
      );
    } else {
      return <div className={'edge'} />;
    }
  }

  renderVertical() {
    if (this.props.col === 9) {
      return (
        <div className={'edge'}>
          <div className={'edgeText'}>{rowString(this.props.row)}</div>
        </div>
      );
    } else {
      return <div className={'edge'} />;
    }
  }
}
