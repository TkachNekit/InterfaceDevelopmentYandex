class TimeConverter {
    static DAY_DURATION = 1440;

    static calculateBankTime(time) {
        const hour = Number(time.slice(0, 2));
        const minutes = Number(time.slice(3, 5));
        return hour * 60 + minutes;
    }

    static calculateManTime(time) {
        const hour = Number(time.slice(3, 5));
        const minutes = Number(time.slice(6, 8));

        switch (time.slice(0, 2)) {
            case 'ПН':
                return hour * 60 + minutes;
            case 'ВТ':
                return this.DAY_DURATION + hour * 60 + minutes;
            case 'СР':
                return this.DAY_DURATION * 2 + hour * 60 + minutes;
            case 'ЧТ':
                return this.DAY_DURATION * 3 + hour * 60 + minutes;
            default:
                return 5760;
        }
    }

    static convertTimeZone(fromTime, fromTimeZone, toTimeZone) {
        const timeZoneDifference = toTimeZone - fromTimeZone;
        return fromTime + timeZoneDifference * 60;
    }

    static calculateRobberyTime(time) {
        let minute = time % 60;
        let hour = (time % this.DAY_DURATION - minute) / 60;

        minute = (minute < 10) ? '0' + minute : minute.toString();
        hour = (hour < 10) ? '0' + hour : hour.toString();

        if (time < this.DAY_DURATION) {
            return [hour, minute, 'ПН'];
        }
        if (time < this.DAY_DURATION * 2) {
            return [hour, minute, 'ВТ'];
        }

        return [hour, minute, 'СР'];
    }
}

class RobberyScheduler {
    static TASK_COMPLETED_FLAG = true;

    constructor(schedule, duration, bankHours) {
        this.schedule = schedule;
        this.duration = duration;
        this.bankFrom = TimeConverter.calculateBankTime(bankHours.from);
        this.bankTo = TimeConverter.calculateBankTime(bankHours.to);
        this.bankTimeZone = Number(bankHours.from.slice(6, 8));
        this.timeRobbery = [
            [this.bankFrom, this.bankTo],
            [TimeConverter.DAY_DURATION + this.bankFrom, TimeConverter.DAY_DURATION + this.bankTo],
            [TimeConverter.DAY_DURATION * 2 + this.bankFrom, TimeConverter.DAY_DURATION * 2 + this.bankTo]
        ];
    }

    findIntersectingTime(listTime, start, end, sliceTime) {
        const [startSlice, endSlice] = sliceTime;
        if (end < endSlice) {
            if (startSlice < start) {
                listTime.push([startSlice, start], [end, endSlice]);
            } else if (startSlice < end) {
                listTime.push([end, endSlice]);
            } else {
                listTime.push(sliceTime);
            }
        } else if (startSlice < start) {
            if (start < endSlice) {
                listTime.push([startSlice, start]);
            } else {
                listTime.push(sliceTime);
            }
        }

        return listTime;
    }

    refineTimeRange(start, end) {
        let listTime = [];
        for (const sliceTime of this.timeRobbery) {
            listTime = this.findIntersectingTime(listTime, start, end, sliceTime);
        }

        return listTime;
    }

    exists() {
        return this.timeRobbery.length !== 0;
    }

    format(template) {
        if (!this.exists()) {
            return '';
        }

        const firstTime = this.timeRobbery[0];
        const result = TimeConverter.calculateRobberyTime(firstTime[0]);
        return template.replace(/%HH/g, result[0])
            .replace(/%MM/g, result[1])
            .replace(/%DD/g, result[2]);
    }

    tryLater() {
        if (this.timeRobbery.length === 0) {
            return false;
        }
        const firstSlice = this.timeRobbery[0];
        if (firstSlice[1] - firstSlice[0] >= this.duration + 30) {
            this.timeRobbery[0][0] += 30;
            return true;
        }
        this.timeRobbery.splice(0, 1);
        if (this.timeRobbery.length > 0) {
            return true;
        }
        this.timeRobbery.push(firstSlice);
        return false;
    }
}

// Пример использования
const schedule = {
    person1: [
        { from: 'ПН 08:00+2', to: 'ПН 12:00+2' },
        { from: 'ВТ 09:00+3', to: 'ВТ 14:00+3' },
    ],
    person2: [
        { from: 'ПН 10:00+2', to: 'ПН 15:00+2' },
        { from: 'СР 14:00+5', to: 'СР 16:00+5' },
    ],
};

const duration = 60;
const bankHours = { from: 'ПН 09:00+2', to: 'ПН 18:00+2' };

const robberyScheduler = new RobberyScheduler(schedule, duration, bankHours);

console.log(robberyScheduler.exists()); // true
console.log(robberyScheduler.format('Начинаем в %HH:%MM (%DD)')); // Начинаем в 14:00 (СР)
console.log(robberyScheduler.tryLater()); // true
console.log(robberyScheduler.tryLater()); // false


const gangSchedule = {
    Danny: [{ from: 'ПН 12:00+5', to: 'ПН 17:00+5' }, { from: 'ВТ 13:00+5', to: 'ВТ 16:00+5' }],
    Rusty: [{ from: 'ПН 11:30+5', to: 'ПН 16:30+5' }, { from: 'ВТ 13:00+5', to: 'ВТ 16:00+5' }],
    Linus: [
        { from: 'ПН 09:00+3', to: 'ПН 14:00+3' },
        { from: 'ПН 21:00+3', to: 'ВТ 09:30+3' },
        { from: 'СР 09:30+3', to: 'СР 15:00+3' }
    ]
};

const bankWorkingHours = {
    from: '10:00+5',
    to: '18:00+5'
};

// Время не существует
const longMoment = getAppropriateMoment(gangSchedule, 121, bankWorkingHours);

// Выведется `false` и `""`
console.info(longMoment.exists());
console.info(longMoment.format('Метим на %DD, старт в %HH:%MM!'));

// Время существует
const moment = getAppropriateMoment(gangSchedule, 90, bankWorkingHours);

// Выведется `true` и `"Метим на ВТ, старт в 11:30!"`
console.info(moment.exists());
console.info(moment.format('Метим на %DD, старт в %HH:%MM!'));

// Дополнительное задание
// Вернет `true`
moment.tryLater();
// `"ВТ 16:00"`
console.info(moment.format('%DD %HH:%MM'));

// Вернет `true`
moment.tryLater();
// `"ВТ 16:30"`
console.info(moment.format('%DD %HH:%MM'));

// Вернет `true`
moment.tryLater();
// `"СР 10:00"`
console.info(moment.format('%DD %HH:%MM'));

// Вернет `false`
moment.tryLater();
// `"СР 10:00"`
console.info(moment.format('%DD %HH:%MM'));