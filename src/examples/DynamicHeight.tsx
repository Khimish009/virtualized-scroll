import { useState } from "react";

const items = Array.from({ length: 1_000 }, (_, index) => ({
  id: Math.random().toString(36).slice(2),
  text: String(index),
}));

const itemHeight = 40;
const containerHeight = 800;

export const DynamicHeight = () => {
  const [listItems, setListItems] = useState(items)

  return (
    <div style={{ padding: 12 }}>
      <h1>Table</h1>
      <div style={{ marginBottom: 12 }}>
        <button
          onClick={() => setListItems((items) => items.slice().reverse())}
        >
          reverse
        </button>
      </div>
      <div
        style={{
          height: containerHeight,
          overflow: 'auto',
          border: '1px solid lightgrey'
        }}
      >
        {listItems.map((item) => {
          return (
            <div
              style={{
                height: itemHeight,
                padding: '6px 12px'
              }}
              key={item.id}
            >
              {item.text}
            </div>
          )
        })}
      </div>
    </div>
  );
};