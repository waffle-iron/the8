import { List, Map, fromJS } from "immutable";
import Radium from "radium";
import { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TestBackend from "react-dnd-test-backend";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import AssignableAttendeeListContainer from "./attendee-list.container";
import BoatListContainer from "./boat-list.container";
import BoatRecord from "./boat.record";
import WaterEventRecord from "./water-event.record";
import AttendeeRecord from "./attendee.record";
import reducer from "./reducer";

const mapEventSettings = serverData => fromJS(serverData);

const mapBoats = serverData => {
    const reviver = (key, value) => {
        if (key === "") {
            const boatMap = Map()
                .withMutations(map => {
                    value.forEach(boat => {
                        const boatId = boat.get("boatId");

                        const boatRecord = new BoatRecord({
                            boatId,
                            title: boat.get("title"),
                            isCoxed: boat.get("isCoxed"),
                            seatCount: boat.get("seatCount"),
                            seatAssignments: boat.get("seatAssignments")
                        });

                        map.set(boatId, boatRecord);
                    });
                });

            return boatMap;
        }

        return value;
    };

    return fromJS(serverData, reviver);
};

const mapAttendees = serverData => {
    const reviver = (key, value) => {
        if (key === "") {
            return value.map(attendee => new AttendeeRecord({
                attendeeId: attendee.get("attendeeId"),
                displayName: attendee.get("displayName"),
                sortName: attendee.get("sortName"),
                isCoxswain: attendee.get("isCoxswain")
            }));
        }

        return value;
    };

    return fromJS(serverData, reviver);
};

export const mapServerDataToState = serverData => ({
    eventSettings: mapEventSettings(serverData.eventSettings),
    boats: mapBoats(serverData.boats),
    attendees: mapAttendees(serverData.attendees)
});

const styles = {
    root: {
        "position": "absolute",
        "height": "100%"
    }
};

const sampleState = {
    eventSettings: new WaterEventRecord({
        allowMultipleAttendeeAssignments: true
    }),
    boats: new Map({
        "boat-1": new BoatRecord({
            boatId: "boat-1",
            title: "Lucky",
            seatCount: 4,
            isCoxed: true,
            seatAssignments: Map([
                [1, "rower-1"]
            ])
        }),
        "boat-2": new BoatRecord({
            boatId: "boat-2",
            title: "Voyager 1",
            seatCount: 2,
            isCoxed: false,
            seatAssignments: Map()
        })
    }),
    attendees: new List([ 
        new AttendeeRecord({
            attendeeId: "cox-1",
            sortName: "Hill, Dule",
            displayName: "Dule Hill",
            isCoxswain: true
        }),
        new AttendeeRecord({
            attendeeId: "rower-1",
            sortName: "Sheen, Martin",
            displayName: "Martin Sheen"
        }),
        new AttendeeRecord({
            attendeeId: "rower-2",
            sortName: "Lowe, Rob",
            displayName: "Rob Lowe"
        }),
        new AttendeeRecord({
            attendeeId: "rower-3",
            sortName: "Schiff, Richard",
            displayName: "Richard Schiff"
        }),
        new AttendeeRecord({
            attendeeId: "rower-4",
            sortName: "Janney, Allison",
            displayName: "Allison Janney"
        }),
        new AttendeeRecord({
            attendeeId: "rower-5",
            sortName: "Spencer, John",
            displayName: "John Spencer"
        })
    ])
};

const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
}

const store = createStore(reducer, { ...sampleState }, applyMiddleware(logger));

@Radium
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div style={styles.root}>
                    <AssignableAttendeeListContainer />
                    <BoatListContainer />
                </div>
            </Provider>
        );
    }
}

export const TestApp = DragDropContext(TestBackend)(App);
export default DragDropContext(HTML5Backend)(App)