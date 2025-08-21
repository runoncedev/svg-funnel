// const values = [300, 180, 130, 100];

import { useEffect, useState } from "react";

const initialValues = [
  Math.random(),
  Math.random(),
  Math.random(),
  Math.random(),
].map((value) => value * 1);

const normalize = (value: number, values: number[]): number => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return 10 + ((value - min) / (max - min)) * 150;
};

const normalizedValues = initialValues.map((value) =>
  normalize(value, initialValues)
);

console.log(normalizedValues);

const height = 46;
const curveOffset = 40;
const gap = 2;

function App() {
  const [values, setValues] = useState(normalizedValues);

  console.log(values);

  useEffect(() => {
    const interval = setInterval(() => {
      const newValues = [
        Math.random(),
        Math.random(),
        Math.random(),
        Math.random(),
      ].map((value) => normalize(value * 1, initialValues));

      setValues(newValues);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      width="170px"
      height={`${
        normalizedValues.length * height + gap * (normalizedValues.length - 1)
      }px`}
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="0"
      style={{
        // border: "1px solid red",
        margin: "0 auto",
        display: "block",
        marginTop: 50,
      }}
    >
      {values.map((value, index) => {
        const color = index % 2 === 0 ? "orange" : "pink";

        const startX = value;
        const startY = height * index + gap * index;

        const endX = index === values.length - 1 ? value : values[index + 1];
        const endY = height * (index + 1) + gap * index;

        const firstLineCommand = `M ${startX} ${startY}`;

        const curveCommand = `C ${startX} ${startY + curveOffset}, ${endX} ${
          endY - curveOffset
        }, ${endX} ${endY}`;

        const secondLineCommand = `L 0 ${endY} L 0 ${startY} Z`;

        const d = `${firstLineCommand} ${curveCommand} ${secondLineCommand}`;

        return <path key={index} d={d} stroke="transparent" fill={color} />;
      })}
      {/* <path
        d="M 100 0 C 100 20, 80 30, 80 50 L 0 50 L 0 0 Z"
        stroke="pink"
        fill="transparent"
      /> */}
      {/* <path
        d="M 80 50 C 80 70, 60 70, 60 100"
        stroke="orange"
        fill="transparent"
      />
      <path
        d="M 60 100 C 60 120, 0 120, 0 150"
        stroke="orange"
        fill="transparent"
      /> */}
    </svg>
  );
}

export default App;
