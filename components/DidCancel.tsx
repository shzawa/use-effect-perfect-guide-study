import React, { useState, useEffect } from "react";

export const Sample = () => {
  console.log("render()");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let didCancel = false;

    (async() => {
      console.log('async関数が呼ばれた')
      await new Promise(resolve => setTimeout(resolve, 3000))
      console.log(`didCancel: ${didCancel}, count: ${count}`);
      if (!didCancel) {
        console.log('setTimeoutから抜けた')
      }
    })()

    return () => {
      console.log(`didCancelをtrueにした count = ${count}`)
      didCancel = true;
    };
  }, [count])

  return <button onClick={() => {setCount(count + 1)}}>ボタン</button>
};
