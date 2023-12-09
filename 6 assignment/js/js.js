'use strict';
class Iterator {
    constructor(friends, filter) {
        if (!(filter instanceof Filter)) {
            throw new TypeError('filter must be a type of Filter');
        }
        this.friends = this.getFilteredFriends(friends, filter);
        this.position = 0;
    }

    done() {
        return this.position >= this.friends.length;
    }

    next() {
        return this.done() ? null : this.friends[this.position++];
    }

    getFilteredFriends(friends, filter) {
        return this.getFriendsToInvite(friends).filter(filter.isSuitable);
    }

    getFriendsToInvite(friends, maxLevel = Infinity) {
        let invitations = [];

        if (maxLevel < 1) {
            return invitations;
        }

        let previousCircle = this.getBestFriends(friends);
        if (previousCircle.length === 0) {
            return invitations;
        }

        invitations = invitations.concat(previousCircle);
        for (let i = 1; i < maxLevel; i++) {
            previousCircle = this.getNextCircle(previousCircle, invitations, friends);

            if (!previousCircle.length) {
                break;
            }
            invitations = invitations.concat(previousCircle);
        }

        return invitations;
    }

    getBestFriends(friends) {
        return friends.filter(friend => friend.best).sort(this.compareFriends);
    }

    getNextCircle(previousCircle, addedFriends, friends) {
        const candidateNames = [].concat(...previousCircle.map(({ friends }) => friends));
        const candidates = candidateNames.map(name => friends.find(friend => name === friend.name));
        const alreadyInvited = friend => !addedFriends.includes(friend);
        const nextCircle = this.removeDuplicates(candidates.filter(alreadyInvited));

        return nextCircle.sort(this.compareFriends);
    }

    compareFriends(a, b) {
        return a.name.localeCompare(b.name);
    }

    removeDuplicates(arr) {
        return Array.from(new Set(arr));
    }
}

class LimitedIterator extends Iterator {
    constructor(friends, filter, maxLevel) {
        super(friends, filter);
        this.friends = this.getFriendsToInvite(friends, maxLevel).filter(filter.isSuitable);
        this.position = 0;
    }
}

class Filter {
    constructor() {
        this.isSuitable = () => true;
    }
}

class MaleFilter extends Filter {
    constructor() {
        super();
        this.isSuitable = ({ gender }) => gender === 'male';
    }
}

class FemaleFilter extends Filter {
    constructor() {
        super();
        this.isSuitable = ({ gender }) => gender === 'female';
    }
}

exports.Iterator = Iterator;
exports.LimitedIterator = LimitedIterator;

exports.Filter = Filter;
exports.MaleFilter = MaleFilter;
exports.FemaleFilter = FemaleFilter;