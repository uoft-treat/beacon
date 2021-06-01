import React from 'react';
import renderer from 'react-test-renderer';
import {ExperimentButton} from "../../components/ExperimentButton";

test('Container should render according to snapshot', () => {
    const component = renderer.create(
        <ExperimentButton/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
