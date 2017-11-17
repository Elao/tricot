export default class Timer {
    constructor(onTick) {
        this.onTick = onTick;
        this.tempo = null;

        this.tick = this.tick.bind(this);
    }

    start(tempo) {
        if (!this.interval) {
            this.tempo = tempo;
            this.interval = setInterval(this.tick, tempo);
            this.time = Date.now();
            //this.tick();
        }
    }

    stop() {
        if (this.interval) {
            this.interval = clearInterval(this.tick);
            this.time = null;

            return true;
        }

        return false;
    }

    getTime(date) {
        return date - this.time;
    }

    tick() {
        this.onTick(this.getTime(Date.now()));
    }
}
