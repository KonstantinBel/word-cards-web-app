import React from 'react';
import ReactDOM from 'react-dom';
import App, {Search, Button, Table} from './App';
import renderer from 'react-test-renderer';

import Enzime, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
Enzime.configure({ adapter: new Adapter() });

describe('App', () => {

  it('отрисовывает без ошибки', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App>Поиск</App>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('есть корректный снимок', () => {
    const component = renderer.create(
      <App>Поиск</App>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Search', () => {
  const props = {
    onChange: () => {},
    onSubmit: () => {},
    value: 'value',
    children: null
  }

  it('отрисовывает без ошибки', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search {...props}>Поиск</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('есть корректный снимок', () => {
    const component = renderer.create(
      <Search {...props}>Поиск</Search>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Button', () => {
  const props = {
    onClick: () => {},
    children: null
  }

  it('отрисовывает без ошибки', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button {...props}>Дай мне больше</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('есть корректный снимок', () => {
    const component = renderer.create(
      <Button {...props}>Дай мне больше</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Table', () => {

  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
    ],
    onDismiss: () => {}
  };

  it('отрисовывает без ошибки', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Table { ...props } />, div);
  });

  it('shows two items in list', () => {
    const element = shallow(
      <Table { ...props } />
    );

    expect(element.find('.table-row').length).toBe(2);
  });

  test('есть корректный снимок', () => {
    const component = renderer.create(
      <Table { ...props } />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
