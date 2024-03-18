import Position from "./Position.type";

export interface Topic {
  id: string;
  name: string;
  tagColor: string;
  position: Position;
  researchCounts: number;
}
