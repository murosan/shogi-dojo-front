import * as React from 'react';

interface Props {
  remain: number;
  seconds: number;
}

export default class Time extends React.Component<Props, {}> {
  render() {
    const rem = this.props.remain;
    if (rem > 0) {
      const minutes = Math.ceil(rem / 60);
      const min = minutes > 0 ? `${minutes}:` : '';
      const sec = `0${rem % 60}`.slice(-2);
      return <div>{min + sec}</div>;
    } else {
      return <div>{`0 / ${this.props.seconds}`}</div>;
    }
  }
}
