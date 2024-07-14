import { useState } from "react";
import samplePlate6 from "../assets/6-Circle-Gas.png";

interface Props {
  states: number[];
  onClick: (id: number, position: string) => void;
}

function SamplePlate6CircleGas({ states, onClick }: Props) {
  const defaultSlots = [
    { id: 0, tag: "A", top: "193px", y: "161px" },
    { id: 1, tag: "B", top: "153px", y: "217px" },
    { id: 2, tag: "C", top: "94px", y: "207px" },
    { id: 3, tag: "D", top: "133px", y: "161px" },
    { id: 4, tag: "E", top: "94px", y: "115px" },
    { id: 5, tag: "F", top: "153px", y: "105px" },
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
          width: "372px",
          height: "314px",
          margin: "0px",

          left: "41px",
          top: "285px",
        }}
      >
        {slots.map((slot) => (
          <div
            key={slot.id}
            style={{
              position: "absolute",
              left: slot.y,
              top: slot.top,
              width: "50px",
              height: "50px",
              borderRadius: "25px",
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
              width: "50px",
              height: "50px",
              borderRadius: "25px",
              backgroundColor: "rgba(0, 0, 0, 0)",
              zIndex: "3",
              cursor: "pointer",
            }}
            onClick={() => handleClick(slot.id)}
          />
        ))}

        <img
          src={samplePlate6}
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

export default SamplePlate6CircleGas;
