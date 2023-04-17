const { Room, Booking } = require('./index');

describe('Occupancy in a certain date', () => {
    test('should return true (occuped room)', () => {

        const booking1 = new Booking("Booking1","example1@exaple",new Date("04/16/2023"),new Date("04/18/2023"),30,{});
        const booking2 = new Booking("Booking2","example1@exaple",new Date("04/18/2023"),new Date("04/20/2023"),30,{});
        const booking3 = new Booking("Booking3","example1@exaple",new Date("04/20/2023"),new Date("04/22/2023"),30,{});

        const room1 = new Room("Special",[booking1,booking2,booking3],1000,10);

        expect(room1.isOccupied(new Date("04/17/2023"))).toBe(true);
    })

    test('should return false (available room)', () => {

        const booking1 = new Booking("Booking1","example1@exaple",new Date("04/16/2023"),new Date("04/18/2023"),30,{});
        const booking2 = new Booking("Booking2","example1@exaple",new Date("04/18/2023"),new Date("04/20/2023"),30,{});
        const booking3 = new Booking("Booking3","example1@exaple",new Date("04/20/2023"),new Date("04/22/2023"),30,{});

        const room1 = new Room("Special",[booking1,booking2,booking3],1000,10);

        expect(room1.isOccupied(new Date("04/23/2023"))).toBe(false);
    })
})

describe('Percentage of days with occupancy', () => {
    test('should return 0 (no occupancy)', () => {

        const booking1 = new Booking("Booking1","example1@exaple",new Date("04/16/2023"),new Date("04/18/2023"),30,{});
        const booking2 = new Booking("Booking2","example1@exaple",new Date("04/18/2023"),new Date("04/20/2023"),30,{});
        const booking3 = new Booking("Booking3","example1@exaple",new Date("04/20/2023"),new Date("04/22/2023"),30,{});

        const room1 = new Room("Special",[booking1,booking2,booking3],1000,10);

        expect(room1.occupancyPercentage(new Date("04/23/2023"),new Date('04/24/2023'))).toBe(0);
    })

    test('should return 100 (100% occupancy)', () => {

        const booking1 = new Booking("Booking1","example1@exaple",new Date("04/16/2023"),new Date("04/18/2023"),30,{});
        const booking2 = new Booking("Booking2","example1@exaple",new Date("04/18/2023"),new Date("04/20/2023"),30,{});
        const booking3 = new Booking("Booking3","example1@exaple",new Date("04/20/2023"),new Date("04/22/2023"),30,{});

        const room1 = new Room("Special",[booking1,booking2,booking3],1000,10);

        expect(room1.occupancyPercentage(new Date("04/16/2023"),new Date('04/22/2023'))).toBe(100);
    })

    test('should return 50 (50% occupancy)', () => {

        const booking1 = new Booking("Booking1","example1@exaple",new Date("04/16/2023"),new Date("04/18/2023"),30,{});
        const booking2 = new Booking("Booking2","example1@exaple",new Date("04/18/2023"),new Date("04/20/2023"),30,{});
        const booking3 = new Booking("Booking3","example1@exaple",new Date("04/20/2023"),new Date("04/22/2023"),30,{});

        const room1 = new Room("Special",[booking1,booking2,booking3],1000,10);

        expect(room1.occupancyPercentage(new Date("04/16/2023"),new Date('04/28/2023'))).toBe(50);
    })
})