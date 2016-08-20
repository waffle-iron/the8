import { Component } from "react"

import Seat from "./seat.container"

import "./seat-list.component.scss"

export default class SeatList extends Component {
  render() {
    const { 
      seats, 
      attendeeIdsInBoat, 
      boatId 
    } = this.props

    const boatSeats = seats.map((attendeeId, seatNumber) => (
      <Seat key={seatNumber} boatId={boatId} seatNumber={seatNumber} 
        attendeeId={attendeeId} attendeeIdsInBoat={attendeeIdsInBoat} />
    )).valueSeq()

    return (
      <div className="card-block">
        {boatSeats}
      </div>
    )
  }
}
