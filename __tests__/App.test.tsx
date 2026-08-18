import React from 'react';
import renderer, { act } from 'react-test-renderer';
import App from '../App';

test('renders the CarApp home experience', () => {
  let component!: renderer.ReactTestRenderer;

  act(() => {
    component = renderer.create(<App />);
  });

  expect(component).toBeTruthy();
  expect(component.toJSON()).not.toBeNull();
});
