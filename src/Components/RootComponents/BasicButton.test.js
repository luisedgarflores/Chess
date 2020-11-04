import {
  configure,
  shallow,
} from "enzyme";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Adapter from "enzyme-adapter-react-16";
import BasicButton from './BasicButton'
import {Button, Grid} from '@material-ui/core'
configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BasicButton />, div);
});

describe("shallow", () => {
  let shallowWrapper;

  beforeEach(() => {
    shallowWrapper = shallow(<BasicButton />);
  });
  it("able to find a Button", () => {
    expect(shallowWrapper.find(Button).length).toBe(2);
  });
  it ("able to find Grids", ()=> {
    expect(shallowWrapper.find(Grid).length).toBe(1);
  })
});