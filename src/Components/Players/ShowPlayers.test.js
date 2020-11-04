import {
  configure,
  shallow,
} from "enzyme";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Adapter from "enzyme-adapter-react-16";
import ShowPlayers from "./ShowPlayers"
import MaterialTable from 'material-table'
configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ShowPlayers />, div);
});

describe("shallow", () => {
  let shallowWrapper;

  beforeEach(() => {
    shallowWrapper = shallow(<ShowPlayers />);
  });
  it("able to find a table", () => {
    expect(shallowWrapper.find(MaterialTable).length).toBe(1);
  });
});
