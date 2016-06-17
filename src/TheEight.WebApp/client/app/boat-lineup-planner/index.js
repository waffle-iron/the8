import "browsernizr/test/touchevents";
import Modernizr from "browsernizr";
import { List, Map, fromJS } from "immutable";
import { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import TouchBackend from "react-dnd-touch-backend";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import AttendeeList from "./containers/attendee-list";
import BoatList from "./containers/boat-list";
import AttendeeDragLayer from "./components/attendee-drag-layer";

import mapServerDataToState from "./map-server-data-to-state";
import loggerMiddleware from "../common/middleware/logger-middleware";
import appInsightsMiddleware from "../common/middleware/app-insights-middleware";
import reducer from "./reducer";
import sampleState from "./sample-state";

const store = createStore(
  reducer,
  { ...sampleState },
  applyMiddleware(
    loggerMiddleware,
    appInsightsMiddleware
  )
);

export class AppBase extends Component {
  render() {
    const styles = {
      "position": "absolute",
      "height": "100%",
      "paddingTop": "15px",
      "paddingBottom": "15px"
    };

    return (
      <Provider store={store}>
        <div className="container-fluid" style={styles}>
          <AttendeeDragLayer />
          <AttendeeList />
          <BoatList />
        </div>
      </Provider>
    );
  }
}

const backend = Modernizr.touchevents 
    ? TouchBackend({ enableMouseEvents: true })
    : HTML5Backend;

const BoatLineupPlannerApp = DragDropContext(backend)(AppBase);
export default BoatLineupPlannerApp;