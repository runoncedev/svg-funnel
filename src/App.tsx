const values = [300, 180, 130, 100];

const normalizedValues = values.map((value) => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return 10 + ((value - min) / (max - min)) * 150;
});

console.log(normalizedValues);

const height = 46;
const curveOffset = 40;
const gap = 2;

function App() {
  return (
    <svg
      width="170px"
      height={`${
        normalizedValues.length * height + gap * (normalizedValues.length - 1)
      }px`}
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth="10"
      style={{ border: "1px solid red" }}
    >
      {normalizedValues.map((value, index) => {
        const color = index % 2 === 0 ? "orange" : "pink";

        const startX = value;
        const startY = height * index + gap * index;

        const endX =
          index === normalizedValues.length - 1
            ? value
            : normalizedValues[index + 1];
        const endY = height * (index + 1) + gap * index;

        const lineCommand = `M ${startX} ${startY}`;

        const curveCommand = `C ${startX} ${startY + curveOffset}, ${endX} ${
          endY - curveOffset
        }, ${endX} ${endY}`;

        const d = `${lineCommand} ${curveCommand}`;

        console.log(d);

        return <path key={index} d={d} stroke={color} fill="transparent" />;
      })}
      {/* <path
        d="M 100 0 C 100 20, 80 30, 80 50"
        stroke="pink"
        fill="transparent"
      />
      <path
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
