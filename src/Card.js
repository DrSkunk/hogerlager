import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.img`
  height: 200px;
  width: auto;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0);

  &:hover {
    border: 1px solid black;
  }
`;

export default class Card extends Component {
  render() {
    const { team, value, suit, found, onClick, visible } = this.props;
    if (!visible) {
      return null;
    }
    if (found) {
      return <Wrapper src={`/imgs/cards/${value}${suit}.png`} />;
    }
    if (team === 1) {
      return <Wrapper src={`/imgs/cards/blue_back.png`} onClick={onClick} />;
    }
    return <Wrapper src={`/imgs/cards/green_back.png`} onClick={onClick} />;
  }
}
