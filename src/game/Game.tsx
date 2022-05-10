import React from 'react';
import { Player } from '../engine/player';
import { BasicGameConfig } from '../game/config';

interface GameProps {
  config: BasicGameConfig;
}

interface GameData {
  players: Player[];
  currentPlayer: Player;
  // Coming up next:
  // isInitialSetupPhase: boolean;
  // diceNumber: number;
  // turnPhase: TurnPhase ('dice'|'trade'|'construction')
}

const game: GameData = {
  players: [],
  currentPlayer: undefined
};

export const GameContext = React.createContext(game);

/**
 * Game controller. Will set up a context for all the views
 * to nurture from it.
 */
export class Game extends React.Component<GameProps, GameData> {
  constructor(props: GameProps) {
    super(props);
    this.state = this.initGame();
  }

  private initGame(): GameData {
    const players = this.props.config.players;
    const currentPlayer = this.pickFirstPlayer(players);
    return {
      players,
      currentPlayer
    };
  }

  private pickFirstPlayer(players: Player[]): Player {
    return players[Math.floor(Math.random() * players.length)];
  }

  render(): JSX.Element {
    return (
      <GameContext.Provider value={this.state}>
        {this.props.children}
      </GameContext.Provider>
    );
  }
}
