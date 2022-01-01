import { Player } from "./player";

enum EdgeType {
  Road
  // Bridge // Currently unused. For potential expansion
}

interface EdgeOccupation {
  owner: Player;
  type: EdgeType;
}

export class Edge {
  private occupation: EdgeOccupation | undefined;

  constructor(owner?: Player, type: EdgeType = EdgeType.Road) {
    if (owner) {
      this.occupation = {
        owner,
        type
      };
    }
  }

  // TODO: Getters/setters/checkers
}
