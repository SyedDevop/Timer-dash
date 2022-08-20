import Timer, { TimerEventType } from "easytimer.js";

import { log } from "../logger";
import Prisma from "../prisma";

export type UpdateTImerType =
  | "secondsUpdated"
  | "minutesUpdated"
  | "hoursUpdated";
export type setTimerActionsType = "start" | "pause" | "reset";
class MyTimer {
  timer: { [key: string]: Timer };
  timerName: { [key: string]: string | null };
  public static instance: MyTimer;
  constructor() {
    MyTimer.instance = this;
    this.timer = {};
    this.timerName = {};
    this.init();
  }
  private async init() {
    try {
      const data = await Prisma.console.findMany();
      for (let console of data) {
        this.timer[console.id] = new Timer({
          countdown: true,
        });
        this.timerName[console.id] = console.name;
      }
      return this.timer;
    } catch (error) {
      log.error(error);
      process.exit(1);
    } finally {
      await Prisma.$disconnect();
    }
  }
  get currentTimersTime() {
    interface CurrentTimersTime {
      [key: string]: {
        minute: number;
        seconds: number;
        hours: number;
        state: boolean;
      };
    }
    const timers: CurrentTimersTime = {} as CurrentTimersTime;
    for (const time in this.timer) {
      timers[time] = {
        minute: this.timer[time].getTimeValues().minutes,
        seconds: this.timer[time].getTimeValues().seconds,
        hours: this.timer[time].getTimeValues().hours,
        state: this.timer[time].isRunning(),
      };
    }
    return timers;
  }

  public getUpdateTimers(
    timeType: UpdateTImerType,
    callback: (id: string) => void
  ): void;
  // @ts-ignore
  public getUpdateTimers(
    timeType: "targetAchieved",
    callback: (id: string, currentState: boolean) => void
  ): void;
  public getUpdateTimers(
    timeType: UpdateTImerType | "targetAchieved",
    callback: (id: string, currentState?: boolean) => void
  ): void {
    for (const timer in this.timer) {
      this.timer[timer].addEventListener(timeType, () => {
        if (timeType === "targetAchieved") {
          callback(timer, this.timer[timer].isRunning());
        } else {
          callback(timer);
        }
      });
    }
  }

  public setTimerActions(timerId: string, action: setTimerActionsType) {
    this.timer[timerId][action]();
    return this.timer[timerId].isRunning();
  }

  public startTimer(timerId: string, minute: number) {
    this.timer[timerId].start({
      startValues: { minutes: minute },
    });
    return this.timer[timerId].isRunning();
  }

  public addEventListener(
    event: TimerEventType,
    id: string,
    callback?: (id: string) => void
  ) {
    this.timer[id].addEventListener(event, () => {
      log.info(id, "done");
      if (callback !== undefined) {
        callback(id);
      }
    });
  }

  public removeAllListeners() {
    for (const timer in this.timer) {
      this.timer[timer].removeAllEventListeners();
    }
  }

  public allTargetAchievedEventListener() {
    for (const timer in this.timer) {
      this.timer[timer].addEventListener("targetAchieved", () => {
        log.info(this.timerName[timer] + " done");
      });
    }
  }
}

export default MyTimer;
