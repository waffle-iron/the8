import "browsernizr/test/touchevents"
import Modernizr from "browsernizr"

import TouchBackend from "react-dnd-touch-backend"
import HTML5Backend from "react-dnd-html5-backend"
import { DragDropContext } from "react-dnd"

import classNames from "classnames"
import { List, Map, fromJS } from "immutable"
import { Component } from "react"
import { Provider } from "react-redux"
import { LocalDate } from "js-joda"

import AttendeeList from "./event-details/attendee-list.container"
import BoatList from "./boat-list/boat-list.container"
import AttendeeDragLayer from "./common/attendee-drag-layer.component"

import { Iterable } from "immutable"
import { applyMiddleware, compose, createStore } from "redux"
import createLogger from "redux-logger"
import createSagaMiddleware from "redux-saga"

import initializeStore from "app/common/initialize-store"

import rootReducer from "../reducers/root.reducer"
import rootSaga from "../sagas/root.saga"

import "./root.component.scss"

const sampleState = {
  appStatus: fromJS({
    isInitialDataLoaded: false
  }),
  event: fromJS({
    eventDetails: {
      saved: {
        eventId: "event-1",
        date: LocalDate.of(2016, 7, 30),
        notes: "",
        mode: "PRACTICE"
      },
      modified: {
        eventId: "event-1",
        date: LocalDate.of(2016, 7, 30),
        notes: "",
        mode: "PRACTICE"
      }
    },
    boats: {
      "boat-1": {
        boat: {
          details: {
            boatId: "boat-1",
            title: "Lucky",
            seatCount: 4,
            isCoxed: true
          }
        },
        isSaving: true
      },
      "boat-2": {
        boat: {
          details: {
            boatId: "boat-2",
            title: "Voyager 1",
            seatCount: 2,
            isCoxed: false
          }
        }
      }
    },
    attendees: {
      attendees: [ 
        {
          attendeeId: "cox-1",
          sortName: "Hill, Dule",
          displayName: "Dule Hill",
          position: "COXSWAIN"
        },
        {
          attendeeId: "rower-1",
          sortName: "Sheen, Martin",
          displayName: "Martin Sheen",
          position: "PORT_ROWER"
        },
        {
          attendeeId: "rower-2",
          sortName: "Lowe, Rob",
          displayName: "Rob Lowe",
          position: "STARBOARD_ROWER"
        },
        {
          attendeeId: "rower-3",
          sortName: "Schiff, Richard",
          displayName: "Richard Schiff",
          position: "BISWEPTUAL_ROWER"
        },
        {
          attendeeId: "rower-4",
          sortName: "Janney, Allison",
          displayName: "Allison Janney",
          position: "STARBOARD_ROWER"
        },
        {
          attendeeId: "rower-5",
          sortName: "Spencer, John",
          displayName: "John Spencer",
          position: "PORT_ROWER"
        }
      ]
    }
  })
}

export class Root extends Component {
  constructor() {
    super()
    this.store = initializeStore(sampleState, rootReducer, rootSaga)
  }

  componentDidMount() {
    this.store.dispatch({
      type: "SET_INITIAL_STATE",
      payload: sampleState
    })
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="container-fluid boat-lineup-planner">
          <AttendeeDragLayer />
          <AttendeeList />
          {/*<BoatList />*/}
        </div>
      </Provider>
    )
  }
}

const backend = 
  Modernizr.touchevents 
    ? TouchBackend({ enableMouseEvents: true })
    : HTML5Backend

const BoatLineupPlannerApp = DragDropContext(backend)(Root)
export default BoatLineupPlannerApp
