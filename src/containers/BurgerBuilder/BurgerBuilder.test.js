import React from "react";

import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";

import { BugerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe('<BugerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BugerBuilder onInitIngredients={() => { }} />);
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({
            ings: {
                salad: 0
            }
        });

        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
});