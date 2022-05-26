export interface AddMinutesProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  timeReset: (newExpiryTimestamp: Date, autoStart?: boolean) => void;
}

export interface TimerBodyProps {
  timeID: number | string;
}
