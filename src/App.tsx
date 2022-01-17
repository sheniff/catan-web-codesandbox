import { Board } from './engine/board';
import './styles.css';
import { BasicGameConfig } from './game/config';

import { CatanBoard } from './view/CatanBoard';
export default function App() {
  const config = new BasicGameConfig();
  const board = new Board(2, config);

  return (
    <div className="App">
      <h1>Catan</h1>
      <CatanBoard board={board} />
    </div>
  );
}
