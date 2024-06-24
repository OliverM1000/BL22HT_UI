import { useState } from "react";
import samplePlate8 from "../assets/8-Circle.png";

interface Props {
  states: number[];
  onClick: (id: number, position: string) => void;
}

function SamplePlate8Circle({ states, onClick }: Props) {
  const defaultSlots = [
    { id: 0, tag: "A", top: "41px", y: "12px" },
    { id: 1, tag: "B", top: "41px", y: "100px" },
    { id: 2, tag: "C", top: "80px", y: "56px" },
    { id: 3, tag: "D", top: "119px", y: "14px" },
    { id: 4, tag: "E", top: "119px", y: "100px" },
    { id: 5, tag: "F", top: "158px", y: "56px" },
    { id: 6, tag: "G", top: "197px", y: "14px" },
    { id: 7, tag: "H", top: "197px", y: "100px" },
  ];

  const styles = [
    "rgba(240, 240, 240, 1)",
    "rgba(30, 144, 255, 1)",
    "rgba(195, 255, 147, 1)",
  ];

  const [slots, setSlots] = useState(defaultSlots);

  const handleClick = (id: number) => {
    const slot = slots.find((slot) => slot.id === id);
    onClick(id, slot ? slot.tag : "");
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "160px",
          height: "316px",
          margin: "4px",
        }}
      >
        {slots.map((slot) => (
          <div
            key={slot.id}
            style={{
              position: "absolute",
              left: slot.y,
              top: slot.top,
              width: "48px",
              height: "48px",
              backgroundColor: styles[states[slot.id]],
              zIndex: "1",
            }}
          />
        ))}
        {slots.map((slot) => (
          <div
            key={"c_" + slot.id}
            style={{
              position: "absolute",
              left: slot.y,
              top: slot.top,
              width: "48px",
              height: "48px",
              backgroundColor: "rgba(0, 0, 0, 0)",
              zIndex: "3",
              cursor: "pointer",
            }}
            onClick={() => handleClick(slot.id)}
          />
        ))}
        <img
          src={samplePlate8}
          style={{
            position: "absolute",
            left: "0px",
            top: "0px",
            maxWidth: "100%",
            zIndex: "2",
          }}
        />
      </div>
    </>
  );
}

export default SamplePlate8Circle;
