import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import shuffleSeed from 'shuffle-seed';
import Card from './Card';

const suits = {
  diamonds: 'D',
  clubs: 'C',
  hearts: 'H',
  spades: 'S'
};

const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

const Wrapper = styled.div`
  padding: 20px;
`;

function Team(props) {
  const { cards, team, onCardClick } = props;
  return cards.map((card, index) => (
    <Card
      key={card.value + card.suit + team}
      team={team}
      value={card.value}
      suit={card.suit}
      found={card.found}
      visible={card.visible}
      onClick={() => onCardClick(team, index)}
    />
  ));
}

function startNewGame() {
  window.location.replace(
    window.location.origin + window.location.pathname + '?seed=' + nanoid()
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    const searchParams = new URL(window.location).searchParams;
    const seed = searchParams.get('seed');
    if (!seed) {
      startNewGame();
    }

    this.allCards = [];
    Object.values(suits).forEach(suit => {
      values.forEach(value => {
        this.allCards.push({
          suit,
          value,
          found: false
        });
      });
    });

    const team1 = shuffleSeed.shuffle(
      JSON.parse(JSON.stringify(this.allCards)),
      seed + 1
    );
    const team2 = shuffleSeed.shuffle(
      JSON.parse(JSON.stringify(this.allCards)),
      seed + 2
    );

    team1[0].found = true;
    team1[0].visible = true;
    team1[1].visible = true;
    team2[0].found = true;
    team2[0].visible = true;
    team2[1].visible = true;
    this.state = {
      team1,
      team2,
      team1score: 0,
      team2score: 0
    };
  }

  componentDidMount() {
    this.allCards.forEach(card => {
      const img = new Image();
      img.src = `/imgs/cards/${card.value}${card.suit}.png`;
      console.log(img);
    });
  }

  onCardClick = (team, index) => {
    console.log('oncardclick', team, index);
    if (team === 1) {
      this.setState(state => {
        const team1 = JSON.parse(JSON.stringify(state.team1));
        team1[index].found = true;
        if (index !== 51) {
          team1[index + 1].visible = true;
        }
        return { team1, team1score: state.team1score + 1 };
      });
    } else {
      this.setState(state => {
        const team2 = JSON.parse(JSON.stringify(state.team2));
        team2[index].found = true;
        team2[index + 1].visible = true;
        if (index !== 51) {
          team2[index + 1].visible = true;
        }
        return { team2, team2score: state.team2score + 1 };
      });
    }
  };

  render() {
    const { team1, team2, team1score, team2score } = this.state;

    return (
      <Wrapper>
        <h1>Team1 - {team1score}</h1>
        <Team cards={team1} team={1} onCardClick={this.onCardClick} />
        <h1>Team2 - {team2score}</h1>
        <Team cards={team2} team={2} onCardClick={this.onCardClick} />
      </Wrapper>
    );
  }
}
