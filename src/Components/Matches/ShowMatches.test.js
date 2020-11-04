import {
  configure,
  shallow,
} from "enzyme";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Adapter from "enzyme-adapter-react-16";
import ShowMatches from "./ShowMatches"
import MaterialTable from 'material-table'
import LeftDrawer from '../Navigation/LeftDrawer'
import NavBar from '../Navigation/NavBar'
configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ShowMatches />, div);
});

describe("shallow", () => {
  let shallowWrapper;

  beforeEach(() => {
    shallowWrapper = shallow(<ShowMatches />);
  });
  it("able to find a table", () => {
    expect(shallowWrapper.find(MaterialTable).length).toBe(1);
  });

  it("able to find drawer", () => {
    expect(shallowWrapper.find(LeftDrawer).length).toBe(1);
  });

  it("able to find navbar", () => {
    expect(shallowWrapper.find(NavBar).length).toBe(1);
  });
});
