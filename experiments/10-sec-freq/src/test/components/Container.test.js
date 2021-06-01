import React from 'react';
import renderer from 'react-test-renderer';
import {Container} from "../../components/Container";

test('Container should render with children according to snapshot', () => {
    const component = renderer.create(
        <Container>
            <div>something</div>
        </Container>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
