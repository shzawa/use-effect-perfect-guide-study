import { useState, useEffect, Component, useRef } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // This effect depends on the `count` state
    }, 1000);
    return () => clearInterval(id);
  }, [count]); // π΄ Bug: `count` is not specified as a dependency

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
    //γ―γγ­γΌγ«ε€γγ»γγ
    document.title = "γ―γγ­γΌ";
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
          // γ¬γ³γγͺγ³γ°γγγ
          setCount({...count});

          // γ¬γ³γγͺγ³γ°γγγͺγ
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
    const count = this.state.count; // γγγη‘γγ¨γζζ°γ? this.state.count γεη§γγ¦γγΎγ
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
    // mutable γͺζζ°γ?ε€γγ»γγγγ
    latestCount.current = count;
    setTimeout(() => {
      // mutable γͺζζ°γ?ε€γθͺ­γ
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

export function Counter8() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}

export function Counter9() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}
