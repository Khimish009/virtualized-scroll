import { useState } from "react";
import { DynamicHeight } from "./examples/DynamicHeight";

const examplesMap = {
  dynamicHeight: DynamicHeight,
};

type Example = keyof typeof examplesMap;

export const App = () => {
  const [example, setExample] = useState<Example>("dynamicHeight");
  const Component = examplesMap[example];

  return (
    <div>
      <div>
        {Object.keys(examplesMap).map((exampleKey) => (
          <button
            key={exampleKey}
            onClick={() => setExample(exampleKey as Example)}
          >
            {exampleKey}
          </button>
        ))}
      </div>
      {<Component />}
    </div>
  );
};
