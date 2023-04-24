import { Room, Booking } from './index';

describe('Occupancy in a certain date', () => {
    test('should return true (occuped room)', () => {

        const booking1 = new Booking({name: "Booking1", email: "example1@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/18/2023"), discount: 30});
        const booking2 = new Booking({name: "Booking2", email: "example2@exaple", checkIn: new Date("04/18/2023"), checkOut: new Date("04/20/2023"), discount: 30});
        const booking3 = new Booking({name: "Booking3", email: "example3@exaple", checkIn: new Date("04/20/2023"), checkOut: new Date("04/22/2023"), discount: 30});

        const room1 = new Room({name: "Special", bookings: [booking1,booking2,booking3], rate: 1000, discount: 10});

        expect(room1.isOccupied(new Date("04/17/2023"))).toBe(true);
    })

    test('should return false (available room)', () => {

        const booking1 = new Booking({name: "Booking1", email: "example1@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/18/2023"), discount: 30});
        const booking2 = new Booking({name: "Booking2", email: "example2@exaple", checkIn: new Date("04/18/2023"), checkOut: new Date("04/20/2023"), discount: 30});
        const booking3 = new Booking({name: "Booking3", email: "example3@exaple", checkIn: new Date("04/20/2023"), checkOut: new Date("04/22/2023"), discount: 30});

        const room1 = new Room({name: "Special", bookings: [booking1,booking2,booking3], rate: 1000, discount: 10});

        expect(room1.isOccupied(new Date("04/23/2023"))).toBe(false);
    })
})

describe('Percentage of days with occupancy', () => {
    test('should return 0 (no occupancy)', () => {

        const booking1 = new Booking({name: "Booking1", email: "example1@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/18/2023"), discount: 30});
        const booking2 = new Booking({name: "Booking2", email: "example2@exaple", checkIn: new Date("04/18/2023"), checkOut: new Date("04/20/2023"), discount: 30});
        const booking3 = new Booking({name: "Booking3", email: "example3@exaple", checkIn: new Date("04/20/2023"), checkOut: new Date("04/22/2023"), discount: 30});

        const room1 = new Room({name: "Special", bookings: [booking1,booking2,booking3], rate: 1000, discount: 10});

        expect(room1.occupancyPercentage(new Date("04/23/2023"),new Date('04/24/2023'))).toBe(0);
    })

    test('should return 100 (100% occupancy)', () => {

        const booking1 = new Booking({name: "Booking1", email: "example1@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/18/2023"), discount: 30});
        const booking2 = new Booking({name: "Booking2", email: "example2@exaple", checkIn: new Date("04/18/2023"), checkOut: new Date("04/20/2023"), discount: 30});
        const booking3 = new Booking({name: "Booking3", email: "example3@exaple", checkIn: new Date("04/20/2023"), checkOut: new Date("04/22/2023"), discount: 30});

        const room1 = new Room({name: "Special", bookings: [booking1,booking2,booking3], rate: 1000, discount: 10});

        expect(room1.occupancyPercentage(new Date("04/16/2023"),new Date('04/22/2023'))).toBe(100);
    })

    test('should return 50 (50% occupancy)', () => {

        const booking1 = new Booking({name: "Booking1", email: "example1@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/18/2023"), discount: 30});
        const booking2 = new Booking({name: "Booking2", email: "example2@exaple", checkIn: new Date("04/18/2023"), checkOut: new Date("04/20/2023"), discount: 30});
        const booking3 = new Booking({name: "Booking3", email: "example3@exaple", checkIn: new Date("04/20/2023"), checkOut: new Date("04/22/2023"), discount: 30});

        const room1 = new Room({name: "Special", bookings: [booking1,booking2,booking3], rate: 1000, discount: 10});

        expect(room1.occupancyPercentage(new Date("04/16/2023"),new Date('04/29/2023'))).toBe(50);
    })
})

describe('Array with rooms not occuped', () => {
    test('should be equal to an empty array (no available rooms)', () => {

        const booking1 = new Booking({name: "Booking1", email: "example1@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/18/2023"), discount: 30});
        const booking2 = new Booking({name: "Booking2", email: "example2@exaple", checkIn: new Date("04/18/2023"), checkOut: new Date("04/20/2023"), discount: 30});

        const room1 = new Room({ name: "Special", bookings: [booking1], rate: 1000, discount: 10});
        const room2 = new Room({ name: "Special", bookings: [booking2], rate: 1000, discount: 10});

        const rooms = [room1,room2]

        expect(Room.availableRooms(rooms,new Date("04/16/2023"),new Date("04/20/2023"))).toEqual([]);
    })

    test('should be equal to room1', () => {

        const booking1 = new Booking({name: "Booking1", email: "example1@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/18/2023"), discount: 30});
        const booking2 = new Booking({name: "Booking2", email: "example2@exaple", checkIn: new Date("04/18/2023"), checkOut: new Date("04/20/2023"), discount: 30});

        const room1 = new Room({ name: "Special", bookings: [booking1], rate: 1000, discount: 10});
        const room2 = new Room({ name: "Special", bookings: [booking2], rate: 1000, discount: 10});

        const rooms = [room1,room2]

        expect(Room.availableRooms(rooms,new Date("04/19/2023"),new Date("04/20/2023"))).toEqual([room1]);
    })

    test('should be equal to room2', () => {

        const booking1 = new Booking({name: "Booking1", email: "example1@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/18/2023"), discount: 30});
        const booking2 = new Booking({name: "Booking2", email: "example2@exaple", checkIn: new Date("04/18/2023"), checkOut: new Date("04/20/2023"), discount: 30});

        const room1 = new Room({ name: "Special", bookings: [booking1], rate: 1000, discount: 10});
        const room2 = new Room({ name: "Special", bookings: [booking2], rate: 1000, discount: 10});

        const rooms = [room1,room2]

        expect(Room.availableRooms(rooms,new Date("04/16/2023"),new Date("04/17/2023"))).toEqual([room2]);
    })
})

describe('Total occupancy percentage across all rooms', () => {
    test('should return 100', () => {

        const booking1 = new Booking({name: "Booking1", email: "example1@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/18/2023"), discount: 30});
        const booking2 = new Booking({name: "Booking2", email: "example2@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/20/2023"), discount: 30});

        const room1 = new Room({ name: "Special", bookings: [booking1], rate: 1000, discount: 10});
        const room2 = new Room({ name: "Special", bookings: [booking2], rate: 1000, discount: 10});

        const rooms = [room1,room2]

        expect(Room.totalOccupancyPercentage(rooms,new Date("04/16/2023"),new Date("04/18/2023"))).toEqual(100);
    })

    test('should return 80', () => {

        const booking1 = new Booking({name: "Booking1", email: "example1@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/18/2023"), discount: 30});
        const booking2 = new Booking({name: "Booking2", email: "example2@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/20/2023"), discount: 30});

        const room1 = new Room({ name: "Special", bookings: [booking1], rate: 1000, discount: 10});
        const room2 = new Room({ name: "Special", bookings: [booking2], rate: 1000, discount: 10});

        const rooms = [room1,room2]

        expect(Room.totalOccupancyPercentage(rooms,new Date("04/16/2023"),new Date("04/20/2023"))).toEqual(80);
    })

    test('should return 0', () => {

        const booking1 = new Booking({name: "Booking1", email: "example1@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/18/2023"), discount: 30});
        const booking2 = new Booking({name: "Booking2", email: "example2@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/20/2023"), discount: 30});

        const room1 = new Room({ name: "Special", bookings: [booking1], rate: 1000, discount: 10});
        const room2 = new Room({ name: "Special", bookings: [booking2], rate: 1000, discount: 10});

        const rooms = [room1,room2]

        expect(Room.totalOccupancyPercentage(rooms,new Date("04/21/2023"),new Date("04/22/2023"))).toEqual(0);
    })

    test('should return 50', () => {

        const booking1 = new Booking({name: "Booking1", email: "example1@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/18/2023"), discount: 30});
        const booking2 = new Booking({name: "Booking2", email: "example2@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/20/2023"), discount: 30});

        const room1 = new Room({ name: "Special", bookings: [booking1], rate: 1000, discount: 10});
        const room2 = new Room({ name: "Special", bookings: [booking2], rate: 1000, discount: 10});

        const rooms = [room1,room2]

        expect(Room.totalOccupancyPercentage(rooms,new Date("04/19/2023"),new Date("04/20/2023"))).toEqual(50);
    })
})

describe('Total price', () => {
    test('should return 400', () => {

        const room1 = new Room({ name: "Special", bookings: [], rate: 1000, discount: 10});

        const booking1 = new Booking({name: "Booking1", email: "example1@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/18/2023"), discount: 30, room: room1});

        room1.bookings.push(booking1)

        expect(booking1.getFee()).toEqual(400);
    })

    test('should return 1000', () => {

        const room1 = new Room({ name: "Special", bookings: [], rate: 1000, discount: 0});

        const booking1 = new Booking({name: "Booking1", email: "example1@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/18/2023"), discount: 0, room: room1});

        room1.bookings.push(booking1)

        expect(booking1.getFee()).toEqual(0);
    })

    test('should return 900', () => {

        const room1 = new Room({ name: "Special", bookings: [], rate: 1000, discount: 40});

        const booking1 = new Booking({name: "Booking1", email: "example1@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/18/2023"), discount: 50, room: room1});

        room1.bookings.push(booking1)

        expect(booking1.getFee()).toEqual(900);
    })

    test('should return 900 when passing more than a total of 90%', () => {

        const room1 = new Room({ name: "Special", bookings: [], rate: 1000, discount: 100});

        const booking1 = new Booking({name: "Booking1", email: "example1@exaple", checkIn: new Date("04/16/2023"), checkOut: new Date("04/18/2023"), discount: 30, room: room1});

        room1.bookings.push(booking1)

        expect(booking1.getFee()).toEqual(900);
    })
})