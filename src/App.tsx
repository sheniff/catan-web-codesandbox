import "./styles.css";

import { HexGrid, Layout, Hexagon, GridGenerator } from "react-hexgrid";
export default function App() {
  const hexagons = GridGenerator.hexagon(3);

  return (
    <div className="App">
      <h1>Catan</h1>
      <HexGrid width={450} height={450}>
        <Layout size={{ x: 7, y: 7 }}>
          {hexagons.map((hex: any, i: number) => (
            <Hexagon key={i} q={hex.q} r={hex.r} s={hex.s} />
          ))}
        </Layout>
      </HexGrid>
    </div>
  );
}
