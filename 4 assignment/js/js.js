class EventEmitter {
    constructor() {
        this.events = new Map();
        this.deletionQueue = [];
    }

    on(event, context, handler) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push({ context, handler });
        return this;
    }

    off(event, context) {
        if (!this.events.has(event)) {
            return this;
        }

        for (const ev of this.events.keys()) {
            if (this.checkEvent(ev, event)) {
                this.deletionQueue.push(ev);
            }
        }

        for (const ev of this.deletionQueue) {
            let filteredEvents = this.events.get(ev).filter(ev => ev.context !== context);
            this.events.set(ev, filteredEvents);
        }

        this.deletionQueue = [];
        return this;
    }

    emit(event) {
        if (this.events.has(event)) {
            for (const { handler, context } of this.events.get(event)) {
                handler.call(context);
            }
        }

        let ind = event.lastIndexOf('.');
        if (ind !== -1) {
            event = event.slice(0, ind);
            this.emit(event);
        }

        return this;
    }

    several(event, context, handler, times) {
        console.info(event, context, handler, times);
    }

    through(event, context, handler, frequency) {
        console.info(event, context, handler, frequency);
    }

    checkEvent(ev, event) {
        return ev === event || ev.startsWith(event + '.');
    }
}

function getEmitter() {
    return new EventEmitter();
}


module.exports = {
    getEmitter
};

