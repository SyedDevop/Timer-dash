export interface AddMinutesProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  timerID: string | number;
}

export interface TimerBodyProps {
  timeID: number | string;
  index: number;
}
