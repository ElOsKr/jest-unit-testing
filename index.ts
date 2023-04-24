interface RoomInterface {
    name: string;
    bookings: Array<Booking>;
    rate: number;
    discount: number;
}

interface BookingInterface{
    name: string;
    email: string;
    checkIn: Date;
    checkOut: Date;
    discount: number;
    room?: Room;
}

class Room {

    name: string
    bookings: Array<Booking>
    rate: number
    discount: number
    
    constructor(roomData: RoomInterface){
        this.name = roomData.name;
        this.bookings = roomData.bookings;
        this.rate = roomData.rate;
        this.discount = roomData.discount;
    }

    isOccupied(date: Date): boolean{

        let occupied = false;
        
        this.bookings.forEach(booking => {
            if(date.getTime() >= booking.checkIn.getTime() && date.getTime() <= booking.checkOut.getTime()){
                occupied = true;
            }
        })
        return occupied;
    }

    occupancyPercentage(startDate: Date, endDate: Date): string | number{

        let countDays = 0;

        let day = (1000*3600*24);

        let daysDifference = Math.ceil((endDate.getTime() - startDate.getTime()) / day) + 1;

        let occupied: Array<boolean> = []

        if(startDate.getTime() > endDate.getTime()){
            return "Start can not be greater than end date";
        }

        do{
            occupied.push(this.isOccupied(new Date(startDate.getTime() + countDays * day)));
            countDays ++;            
        }while(startDate.getTime() + day * countDays <= endDate.getTime())

        let totalOccupied = occupied.filter((item) => item).length;

        return Math.floor((totalOccupied / daysDifference) * 100);


    }

    static totalOccupancyPercentage(rooms: Array<Room>, startDate: Date, endDate: Date): number{
        let occupancy = 0;
        rooms.forEach(room => {
            const result = room.occupancyPercentage(startDate, endDate);
            if(typeof result === 'number'){
                occupancy += result;
            }else{
                occupancy = 0;
            }
        })

        const percentageTotal = occupancy / rooms.length;
        return percentageTotal;
    }

    static availableRooms(rooms: Array<Room>, startDate: Date, endDate: Date): Array<Room>{
        const roomsAvailable: Array<Room> = [];

        rooms.forEach(room => {
            if(room.occupancyPercentage(startDate,endDate)===0){
                roomsAvailable.push(room)
            }
        });

        return roomsAvailable;
    }

}

class Booking{

    name: string;
    email: string;
    checkIn: Date;
    checkOut: Date;
    discount: number;
    room?: Room;

    constructor(bookingData: BookingInterface){
        this.name = bookingData.name;
        this.email = bookingData.email;
        this.checkIn = bookingData.checkIn;
        this.checkOut = bookingData.checkOut;
        this.discount = bookingData.discount;
        this.room = bookingData.room;
    }

    getFee(): number{
        const total = this.room ? ((this.discount + this.room.discount)>=90) ? 90 : this.discount + this.room.discount : 0
        return this.room ? (Math.floor(this.room.rate * (total / 100))) : 0
    }
}

export { Room, Booking } ;