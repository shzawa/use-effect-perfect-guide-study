import { useState, useEffect, Component, useRef } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // This effect depends on the `count` state
    }, 1000);
    return () => clearInterval(id);
  }, [count]); // 🔴 Bug: `count` is not specified as a dependency

  return <h1>{count}</h1>;
}

export const Counter2 = () => {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      console.log('You clicked on: ' + count);
    }, 3000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={handleAlertClick}>
        Show alert
      </button>
    </div>
  );
}

export const Counter3 = () => {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export const Counter4 = () => {
  const [count, setCount] = useState({count: 0});

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `You clicked ${count.count} times`;
    console.log(window);
  });

  if (typeof document !== 'undefined') {
    //クッキーに値をセット
    document.title = "クッキー";
  }

  if (process.browser) {
    console.log("process.browser")
  } else {
    console.log("process.server")
  }

  return (
    <div>
      <p>You clicked {count.count} times</p>
      <button onClick={() => {
          count.count++;
          // レンダリングされる
          setCount({...count});

          // レンダリングされない
          // setCount(count);
        }}>
        Click me
      </button>
    </div>
  );
}

export const Counter5 = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );}

export class Counter6 extends Component {
  state = {
    count: 0
  }
  componentDidMount() {
    const count = this.state.count; // これが無いと、最新の this.state.count を参照してしまう
    setTimeout(() => {
      console.log(`(componentDidMount) You clicked ${count} times`);
    }, 3000)
  }
  componentDidUpdate() {
    const count = this.state.count;
    setTimeout(() => {
      console.log(`(componentDidUpdate) You clicked ${count} times`);
    }, 3000)
  }
  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({count: this.state.count + 1})}>
          Click me
        </button>
      </div>
    )
  }
}

export function Counter7() {
  const [count, setCount] = useState(0);
  const latestCount = useRef(count);

  useEffect(() => {
    // mutable な最新の値をセットする
    latestCount.current = count;
    setTimeout(() => {
      // mutable な最新の値を読む
      console.log(`You clicked ${latestCount.current} times`);
    }, 3000);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
