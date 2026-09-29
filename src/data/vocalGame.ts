export const VOCALS = ['A', 'E', 'I', 'O', 'U'] as const;

export type Vocal = typeof VOCALS[number];

export interface GameLevel {
  id: number;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const LEVELS: GameLevel[] = [
  { id: 1, name: 'Mi primer reto', difficulty: 'easy' },
  { id: 2, name: 'Las vocales', difficulty: 'easy' },
  { id: 3, name: 'Descubriendo vocales', difficulty: 'easy' },
  { id: 4, name: 'El reto continúa', difficulty: 'medium' },
  { id: 5, name: 'Pequeño explorador', difficulty: 'medium' },
  { id: 6, name: 'Gran desafío', difficulty: 'hard' },
  { id: 7, name: 'El último reto', difficulty: 'hard' },
];