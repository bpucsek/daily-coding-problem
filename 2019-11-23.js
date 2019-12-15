/**

Implement a job scheduler which takes in a function f and an integer n, and calls f after n milliseconds.

*/

function TaskScheduler() {
  this.jobs = [];
  this.processing = false;

  this.addJob = function(f, delay) {
    if (delay < 0) throw new Error('invalid-delay');

    let i = 0;

    let runTime = new Date().valueOf() + delay;

    for (; i < this.jobs.length; i++) {
      if (this.jobs[i][0] > runTime) break;
    }

    this.jobs = [
      ...this.jobs.slice(0, i),
      [runTime, f],
      ...this.jobs.slice(i)
    ];

    console.log('Job scheduled to run at: ', new Date(runTime).toISOString());
  }

  this.viewJobs = function() {
    if (this.jobs.length === 0) {
      console.log('No jobs in queue');
    } else {
      console.log(`Jobs - count:${this.jobs.length} next:${new Date(this.jobs[0][0]).toISOString()}`);
    }
  }

  this.run = async function() {
    while(true) {
      await new Promise((resolve) => {
        setTimeout(() => {
          if (this.jobs.length && this.jobs[0][0] < new Date().valueOf()) {
            this.jobs[0][1]();
            this.jobs = this.jobs.slice(1);
          }

          resolve();
        }, 500);
      });
    }
  }
}

let scheduler = new TaskScheduler();

console.log('now: ', new Date());
scheduler.addJob(() => { console.log('run after 3 second'); }, 3000);
scheduler.addJob(() => { console.log('run after 1 second'); }, 1000);
scheduler.addJob(() => { console.log('run after 2 second'); }, 2000);
scheduler.viewJobs();
scheduler.run();