import React, { useCallback, useEffect, useState } from "react";

function TestComp() {
  console.log("render");
  const [number, setNumber] = useState(123);
  const [shopCart, setShopCart] = useState({
    items: [
      {
        id: 1,
        name: "bread",
        price: 123,
      },
      {
        id: 2,
        name: "butter",
        price: 234,
      },
    ],
  });

  useEffect(() => {
    console.log("useEffect()");
    return () => {
      console.log("cleaning up");
    };
  });

  useCallback(() => {
    console.log("useCallback()");
  }, [number]);

  return (
    <div>
      {number}
      <button
        onClick={() => {
          setNumber(number + 1);
        }}
      >
        +
      </button>
      <ol>
        {shopCart.items.map((item, key) => {
          return (
            <li key={key}>
              {item.name},{item.price}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default TestComp;
