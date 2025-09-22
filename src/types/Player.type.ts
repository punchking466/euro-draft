export type PlayerDto = {
  id: string;
  name: string;
  position: string;
  backNumber: number;
  score: number;
  birthYear: number;
  lastPlayed: Date;
  userType: {
    id: string;
    code: number;
    label: string;
  };
};
