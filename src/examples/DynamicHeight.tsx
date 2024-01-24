import { createRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const items = Array.from({ length: 1_000 }, (_, index) => ({
  id: Math.random().toString(36).slice(2),
  text: String(index),
}));

const itemHeight = 40;
const containerHeight = 800;
const overscan = 3

export const DynamicHeight = () => {
  const [listItems, setListItems] = useState(items)
  const [scrollTop, setScrollTop] = useState(0)
  const scrollElementRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const scrollElement = scrollElementRef.current

    if(!scrollElement) return

    const handleScroll = () => {
      const scrollTop = scrollElement.scrollTop

      setScrollTop(scrollTop)
    }

    handleScroll()

    scrollElement.addEventListener('scroll', handleScroll)

    return () => scrollElement.removeEventListener('scroll', handleScroll)
  }, [])

  const range = useMemo(() => {
    const rangeStart = scrollTop
    const rangeEnd = scrollTop + containerHeight

    let startIndex = Math.floor(rangeStart / itemHeight)
    let endIndex = Math.ceil(rangeEnd / itemHeight)

    startIndex = Math.max(0, startIndex - overscan)
    endIndex = Math.min(items.length - 1, endIndex - overscan)

    return [startIndex, endIndex]
  }, [scrollTop, items.length])

  console.log(range)

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
        ref={scrollElementRef}
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
