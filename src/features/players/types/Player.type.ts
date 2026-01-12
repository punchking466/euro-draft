export type PlayerDto = {
  id: string;
  name: string;
  position: string;
  backNumber: number;
  score: number;
  birthYear: number;
  // Keep Date serializable when passed to client components.
  lastPlayed: string;
  userType: {
    id: string;
    code: number;
    label: string;
  };
};
