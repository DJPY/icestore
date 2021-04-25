import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from '@ice/store';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

const delay = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

// 1️⃣ Use a model to define your store
const counter = {
  state: { num: 0 },
  reducers: {
    decrement: (prevState) => ({ num: prevState.num - 1 }),
    increment: (prevState) => ({ num: prevState.num + 1 }),
  },
  effects: () => ({
    async asyncDecrement() {
      await delay(1000);
      this.decrement();
    },
  }),
};

const models = {
  counter,
};

// 2️⃣ Create the store
const store = createStore(models);

// 3️⃣ Consume model
function Counter() {
  const count = store.useModelState('counter');
  // const { increment, asyncDecrement } = dispatchers;
  return (
    <div>
      <span>{count.num}</span>
      {/* <button type="button" onClick={increment}>+</button>
      <button type="button" onClick={asyncDecrement}>-</button> */}
    </div>
  );
}

// 4️⃣ Wrap your components with Provider
const { Provider } = store;
function App() {
  return (
    <Provider initialStates={{counter: { num: 11111 }}}>
      <Counter />
    </Provider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
