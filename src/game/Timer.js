export default class Timer {
    constructor(onTick) {
        this.onTick = onTick;
        this.tempo = null;
        this.timeout = null;

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.tick = this.tick.bind(this);
    }

    start(tempo) {
        if (!this.interval) {
            this.tempo = tempo;
            this.time = Date.now();
            this.timeout = setTimeout(this.tick, tempo);
        }
    }

    stop() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
            this.time = null;

            return true;
        }

        return false;
    }

    getTime(date = Date.now()) {
        return (date - this.time) % this.tempo;
    }

    tick() {
        this.timeout = setTimeout(this.tick, this.tempo - this.getTime());
        this.onTick();
    }
}
