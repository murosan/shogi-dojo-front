import * as React from 'react';
import { UserInfo } from '../../../modules/types';
import { ChangeEvent } from 'react';
import socket from '../../../modules/socket-client';

interface Message {
  user: UserInfo;
  message: string;
}

interface ChatProps {
  gameId: string;
  tabIndex: number;
  displayIndex: number;
}

interface ChatState {
  messages: Array<Message>;
  text: string;
}

export default class Chat extends React.Component<ChatProps, ChatState> {
  constructor(props: ChatProps) {
    super(props);
    this.state = {
      messages: [],
      text: '',
    };
  }

  render() {
    const m = this.state.messages;
    const messages = m.map((mess: Message, i: number) => {
      const userName =
        i == 0 || (i > 0 && m[i - 1].user.userId != mess.user.userId) ? (
          <div className={'name'}>{mess.user.userName}</div>
        ) : (
          undefined
        );
      const message = mess.message.split('\n').map((line, i) => {
        return (
          <div key={`lineOfMessage${i}`}>
            {line}
            &#010;
            {/* <br /> */}
          </div>
        );
      });

      return (
        <div key={`message${i}`} className={'message'}>
          {userName}
          <div className={'text'}>{message}</div>
        </div>
      );
    });

    const btnClass = this.state.text.length > 0 ? 'btnSubmit' : 'btnDisable';

    return (
      <div className={'chatArea'}>
        <div
          id={`messageContainer${this.props.tabIndex}`}
          className={'messageContainer'}
        >
          <div className={'messageArea'}>{messages}</div>
        </div>

        <div className={'inputArea'}>
          <div className={'container'}>
            <textarea
              id={`chatTextarea${this.props.tabIndex}`}
              className={'chatTextarea'}
              rows={1}
              value={this.state.text}
              placeholder={'message'}
              onChange={e => this.changeText(e)}
            />
          </div>
          <div className={'containerBottom'}>
            <button
              id="btnSubmit"
              className={btnClass}
              onClick={() => this.emitMessage()}
            >
              送信
              <span className="description">
                <span title="command">&#x2318;</span>+Enter
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  adjustHeight(e: HTMLTextAreaElement) {
    const maxHeight = 200;
    e.style.cssText = 'padding:0';
    e.style.cssText = 'height:' + e.scrollHeight + 'px';
    if (e.clientHeight > maxHeight) {
      e.style.cssText = 'height:' + maxHeight + 'px';
    }
  }

  adjustScroll(mc: HTMLElement) {
    const last = mc.lastElementChild;
    if (last) {
      const lastOflast = last.lastElementChild;
      if (lastOflast) {
        lastOflast.scrollIntoView();
      }
    }
  }

  changeText(e: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ text: e.target.value });
    this.adjustHeight(e.target);
  }

  emitMessage() {
    socket.emit('chat_message', {
      roomId: this.props.gameId,
      message: this.state.text.trim(),
    });
    this.setState({ text: '' });
  }

  componentDidMount() {
    socket.on('chat_message', (m: Message) => {
      const ta = document.getElementById(`chatTextarea${this.props.tabIndex}`);
      if (ta instanceof HTMLTextAreaElement) {
        this.adjustHeight(ta);
      }
      const mc = document.getElementById(
        `messageContainer${this.props.tabIndex}`,
      );
      if (mc) {
        const top = mc.scrollTop;
        const maxScroll = mc.scrollHeight - mc.clientHeight;
        const rate = top / maxScroll;
        this.setState({ messages: this.state.messages.concat(m) });
        if (maxScroll === 0 || rate > 0.95) {
          this.adjustScroll(mc);
        }
      }
    });
  }
}
