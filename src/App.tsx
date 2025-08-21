import { useState } from "react";

const normalize = (value: number, values: number[]): number => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return Math.round(10 + ((value - min) / (max - min)) * 150);
};

const initialValues = [1000, 500, 200, 200];

const height = 46;
const curveOffset = 30;

function App() {
  const [values, setValues] = useState(initialValues);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          cursor: "pointer",
          width: "392px",
          margin: "0 auto",
          marginTop: 50,
          background: "#F8FAFF",
          borderRadius: 8,
          padding: 4,
        }}
      >
        {values.map((value, index) => {
          const normalizedValue = normalize(value, values);

          const startX = normalizedValue;
          const startY = 0;

          const endX =
            index === values.length - 1
              ? normalizedValue
              : normalize(values[index + 1], values);
          const endY = height;

          const firstLineCommand = `M ${startX} ${startY}`;

          const curveCommand = `C ${startX + 0} ${
            startY + curveOffset
          }, ${endX} ${endY - curveOffset}, ${endX} ${endY}`;

          const secondLineCommand = `L 0 ${endY} L 0 ${startY} Z`;

          const d = `${firstLineCommand} ${curveCommand} ${secondLineCommand}`;

          return (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              width="170px"
              height={`${height}px`}
              style={{
                borderTopLeftRadius: index === 0 ? 4 : 0,
                borderBottomLeftRadius: index === values.length - 1 ? 4 : 0,
              }}
            >
              <path key={index} d={d} stroke="transparent" fill="#30C699" />
            </svg>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          margin: "0 auto",
          marginTop: 50,
          width: "100px",
        }}
      >
        <input
          type="number"
          value={values[0]}
          onChange={(e) => {
            setValues([
              Number(e.target.value),
              values[1],
              values[2],
              values[3],
            ]);
          }}
        />
        <input
          type="number"
          value={values[1]}
          onChange={(e) => {
            setValues([
              values[0],
              Number(e.target.value),
              values[2],
              values[3],
            ]);
          }}
        />
        <input
          type="number"
          value={values[2]}
          onChange={(e) => {
            setValues([
              values[0],
              values[1],
              Number(e.target.value),
              values[3],
            ]);
          }}
        />
        <input
          type="number"
          value={values[3]}
          onChange={(e) => {
            setValues([
              values[0],
              values[1],
              values[2],
              Number(e.target.value),
            ]);
          }}
        />
        <button type="reset" onClick={() => setValues(initialValues)}>
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
