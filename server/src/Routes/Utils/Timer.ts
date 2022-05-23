import { Timer, TimerParams } from "easytimer.js";

// extends the Timer class to MyTimer Class
export class MyTimer extends Timer {
  name: string | undefined;
  constructor(defaultParams?: TimerParams) {
    super(defaultParams);
    this.name = "";
  }
}

export const timers: Record<string, MyTimer> = {
  timer1: new MyTimer({ countdown: true }),
  timer2: new MyTimer({ countdown: true }),
  timer3: new MyTimer({ countdown: true }),
  timer4: new MyTimer({ countdown: true }),
  timer5: new MyTimer({ countdown: true }),
};

for (const timer in timers) {
  timers[timer].start({
    startValues: { seconds: 30 },
  });
  timers[timer].name = timer;
}

for (const timer of Object.values(timers)) {
  timer.addEventListener("secondsUpdated", ({ detail }) => {
    console.log(timer.getTimeValues().toString(),timer.name);
  });
}
