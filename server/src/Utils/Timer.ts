import Timer from "easytimer.js";
// import { PrismaClient } from "@prisma/client";
import Prisma from "../prisma";
// declare module "easytimer.js" {
//   interface Timer {
//     name?: string;
//   }
// }

// await new Prisma.console.

// interface Timers extends Record<string, Timer> {
//   [key: string]: Timer;
// }

// const timers = async () => {
//   try {
//     const data = await Prisma.console.findMany();
//     const times: Timers = {};
//     for (let console of data) {
//       times[console.id] = new Timer();
//     }
//     console.log("GET", times);

//     return times;
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   } finally {
//     await Prisma.$disconnect();
//   }
// };

// // const timerst: Record<string, Timer> = {
// //   timer1: new Timer({ countdown: true }),
// //   timer2: new Timer({ countdown: true }),
// //   timer3: new Timer({ countdown: true }),
// //   timer4: new Timer({ countdown: true }),
// //   timer5: new Timer({ countdown: true }),
// // };
// // console.log(timerst );

// // for (const timer in timers) {
// //   timers[timer].start({
// //     startValues: { seconds: 30 },
// //   });
// //   // timers[timer].name = timer;
// // }

// // for (const timer of Object.values(timers)) {
// //   timer.addEventListener("secondsUpdated", ({ detail }) => {
// //     console.log(timer.getTimeValues().toString());
// //   });
// //   console.log("start");
// // }

// export { timers };

interface MyTimer {
  timer: { [key: string]: Timer };
}
class MyTimer {
  constructor() {
    this.timer = {};
    this.init();
  }
  private async init() {
    try {
      const data = await Prisma.console.findMany();
      let i = 0;
      for (let console of data) {
        i++;
        this.timer[console.id] = new Timer({
          countdown: true,
        });
        this.timer[console.id].start({
          startValues: { seconds: (30 + 1) * 10 },
        });
      }
      return this.timer;
    } catch (error) {
      console.log(error);
      process.exit(1);
    } finally {
      await Prisma.$disconnect();
    }
  }
}

export default MyTimer;
