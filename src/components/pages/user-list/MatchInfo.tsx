import * as React from 'react';
import { MatchData } from '../../../modules/types';

interface Props {
  info: MatchData;
}

export default class MatchDisplay extends React.Component<Props, {}> {
  render() {
    const p1 = this.props.info.player1;
    const p2 = this.props.info.player2;

    return (
      <div className={'matchInfo'}>
        <div className={'player'}>{p1 ? p1.userName : undefined}</div>
        <div className={'vs'} />
        <div className={'player'}>{p2 ? p2.userName : undefined}</div>
      </div>
    );
  }
}
