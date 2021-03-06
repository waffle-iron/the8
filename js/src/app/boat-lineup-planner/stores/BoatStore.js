import { observable, computed, action } from "mobx"
import R from "ramda"

import Boat from "../models/Boat"

export default class BoatStore {
  @observable boats = []

  constructor(attendeeStore) {
    this.attendeeStore = attendeeStore
  }

  @action load() {
    this.addBoat({
      boatId: "boat-1",
      title: "Lucky",
      seatCount: 8,
      isCoxed: true,
      placements: { 
        3: "attendee-1"
      }
    })

    this.addBoat({
      boatId: "boat-2",
      title: "M1",
      seatCount: 4,
      isCoxed: true
    })
  }

  @action addBoat(details) {
    this.boats.push(new Boat(details.boatId, details.title, details.seatCount, details.isCoxed, 
      details.placements || {}, attnId => this.attendeeStore.getAttendeeById(attnId)))
  }

  @computed get allPlacedAttendeeIds() {
    return R.flatten(this.boats.map(b => b.placements.values()))
  }

  isAttendeePlacedInAnyBoat(attendeeId) {
    return this.allPlacedAttendeeIds.includes(attendeeId)
  }
}
