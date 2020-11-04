import {
  configure,
  shallow,
} from "enzyme";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Adapter from "enzyme-adapter-react-16";
import Login from "./Login";
import BasicTextField from '../RootComponents/BasicInput'
import BasicButton from '../RootComponents/BasicButton'
import {Grid} from '@material-ui/core'
configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Login />, div);
});

describe("shallow", () => {
  let shallowWrapper;

  beforeEach(() => {
    shallowWrapper = shallow(<Login />);
  });
  it("able to find a TextField", () => {
    expect(shallowWrapper.find(BasicTextField).length).toBe(2);
    expect(shallowWrapper.find("#childId").exists()).toBeFalsy();
  });
  it("able to find a Button", () => {
    expect(shallowWrapper.find(BasicButton).length).toBe(2);
  });
  it ("able to find Grids", ()=> {
    expect(shallowWrapper.find(Grid).length).toBe(3);
  })
});
