'use strict';

const DAY_DURATION = 1440;
const isExtraTaskSolved = true;

function convertBankTime(time) {
    const hour = Number(time.slice(0, 2));
    const minutes = Number(time.slice(3, 5));

    return hour * 60 + minutes;
}

function convertManTime(time) {
    const hour = Number(time.slice(3, 5));
    const minutes = Number(time.slice(6, 8));

    switch (time.slice(0, 2)) {
        case 'ПН':
            return hour * 60 + minutes;
        case 'ВТ':
            return DAY_DURATION + hour * 60 + minutes;
        case 'СР':
            return DAY_DURATION * 2 + hour * 60 + minutes;
        case 'ЧТ':
            return DAY_DURATION * 3 + hour * 60 + minutes;
        default:
            return 5760;
    }
}

function convertTimeZone(fromTime, fromTimeZone, toTimeZone) {
    const TimeZoneDifference = toTimeZone - fromTimeZone;
    return fromTime + TimeZoneDifference * 60;
}

function convertRobberyTime(time) {
    let minute = time % 60;
    let hour = (time % DAY_DURATION - minute) / 60;
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (time < DAY_DURATION) {
        return [hour, minute, 'ПН'];
    }
    if (time < DAY_DURATION * 2) {
        return [hour, minute, 'ВТ'];
    }

    return [hour, minute, 'СР'];
}

function intersectTime(listTime, start, end, sliceTime) {
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

function refinementTime(start, end, timeRobbery) {
    let listTime = [];
    for (const sliceTime of timeRobbery) {
        listTime = intersectTime(listTime, start, end, sliceTime);
    }

    return listTime;
}


function getAppropriateMoment(schedule, duration, workingHours) {
    //let dateSchedule = {};

    const bankFrom = convertBankTime(workingHours.from);
    const bankTo = convertBankTime(workingHours.to);
    const bankTimeZone = Number(workingHours.from.slice(6, 8));

    let timeRobbery = [
        [bankFrom, bankTo],
        [DAY_DURATION + bankFrom, DAY_DURATION + bankTo],
        [DAY_DURATION * 2 + bankFrom, DAY_DURATION * 2 + bankTo]
    ];

    for (let key in schedule) {
        for (let day of schedule[key]) {
            let timeZoneMan = Number(day.from.slice(9, 11));
            let from = convertTimeZone(convertManTime(day.from), timeZoneMan, bankTimeZone);
            let to = convertTimeZone(convertManTime(day.to), timeZoneMan, bankTimeZone);
            timeRobbery = refinementTime(from, to, timeRobbery);
        }
    }

    timeRobbery = timeRobbery.filter(entry => entry[1] - entry[0] >= duration);


    return {

        exists() {
            return timeRobbery.length !== 0;
        },

        format(template) {
            if (!this.exists()) {
                return '';
            }

            let firstTime = timeRobbery[0];
            let result = convertRobberyTime(firstTime[0]);
            return template.replace(/%HH/g, result[0])
                .replace(/%MM/g, result[1])
                .replace(/%DD/g, result[2]);
        },


        tryLater() {
            if (timeRobbery.length === 0) {
                return false;
            }
            const fistSlice = timeRobbery[0];
            if (fistSlice[1] - fistSlice[0] >= duration + 30) {
                timeRobbery[0][0] += 30;

                return true;
            }
            timeRobbery.splice(0, 1);
            if (timeRobbery.length > 0) {
                return true;
            }
            timeRobbery.push(fistSlice);

            return false;
        }
    };
}

module.exports = {
    getAppropriateMoment,
    isExtraTaskSolved
};
