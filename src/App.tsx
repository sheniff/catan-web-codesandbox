import { Board } from './engine/board';
import './styles.css';

import { CatanBoard } from './view/CatanBoard';
export default function App() {
  const board = new Board(3);

  return (
    <div className="App">
      <h1>Catan</h1>
      <CatanBoard board={board} />
    </div>
  );
}
