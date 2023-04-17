class Room {
    
    constructor(name,bookings,rate,discount){
        this.name = name;
        this.bookings = bookings;
        this.rate = rate;
        this.discount = discount;
    }

    isOccupied(date){

        let occupied = false;
        
        this.bookings.forEach(booking => {
            if(date.getTime() >= booking.checkIn.getTime() && date.getTime() <= booking.checkOut.getTime()){
                occupied = true;
            }
        })
        return occupied;
    }

    occupancyPercentage(startDate, endDate){

        let count = 0;

        let daysDifference = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

        if(startDate.getTime() > endDate.getTime()){
            return "Start can not be greater than end date";
        }

        this.bookings.forEach(booking => {
            if (booking.checkIn.getTime() >= startDate.getTime() && booking.checkOut.getTime() <= endDate.getTime()) {
                count += Math.ceil((booking.checkOut.getTime() - booking.checkIn.getTime()) / (1000 * 3600 * 24));
            }
        })

        return Math.floor((count*100)/daysDifference);


    }

    static totalOccupancyPercentage(rooms,startDate,endDate){

    }

    static availableRooms(rooms,startDate,endDate){
        const roomsAvailable = [];

        rooms.forEach(room => {
            if(room.occupancyPercentage(startDate,endDate)===0){
                roomsAvailable.push(room)
            }
        });

        return roomsAvailable;
    }

}

class Booking{

    constructor(name,email,checkIn,checkOut,discount,room){
        this.name = name;
        this.email = email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.discount = discount;
        this.room = room;
    }

    getFee(){

    }
}

module.exports = { Room, Booking } ;