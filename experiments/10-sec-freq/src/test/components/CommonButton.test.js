import React from 'react';
import renderer from 'react-test-renderer';
import {CommonButton} from "../../components/CommonButton";

test('Button should render according to snapshot', () => {
    const component = renderer.create(
        <CommonButton text={"Amazing text"} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
