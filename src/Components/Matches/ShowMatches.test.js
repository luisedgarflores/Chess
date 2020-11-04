import {
  configure,
  shallow,
} from "enzyme";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Adapter from "enzyme-adapter-react-16";
import ShowMatches from "./ShowMatches"
import MaterialTable from 'material-table'
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
});
