import { useState } from "react";
import samplePlate8 from "../assets/8-Slot.png";

interface Props {
  states: number[];
  onClick: (id: number, position: string) => void;
}

function SamplePlate8Slot({ states: state, onClick }: Props) {
  const defaultSlots = [
    { id: 0, tag: "A", top: "40px" },
    { id: 1, tag: "B", top: "72px" },
    { id: 2, tag: "C", top: "103px" },
    { id: 3, tag: "D", top: "134px" },
    { id: 4, tag: "E", top: "165px" },
    { id: 5, tag: "F", top: "196px" },
    { id: 6, tag: "G", top: "227px" },
    { id: 7, tag: "H", top: "258px" },
  ];

  const styles = [
    "rgba(240, 240, 240, 1)",
    "rgba(30, 144, 255, 1)",
    "rgba(195, 255, 147, 1)",
  ];

  const [slots, setSlots] = useState(defaultSlots);

  const handleClick = (id: number) => {
    setSlots(
      slots.map((slot) =>
        slot.id === id ? { ...slot, state: state[slot.id] } : { ...slot }
      )
    );

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
          margin: "0px",
          left: "62px",
          top: "284px",
        }}
      >
        {slots.map((slot) => (
          <div
            key={slot.id}
            style={{
              position: "absolute",
              left: "0px",
              top: slot.top,
              width: "160px",
              height: "20px",
              backgroundColor: styles[state[slot.id]],
              zIndex: "1",
            }}
          />
        ))}
        {slots.map((slot) => (
          <div
            key={"c_" + slot.id}
            style={{
              position: "absolute",
              left: "0px",
              top: slot.top,
              width: "160px",
              height: "20px",
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

export default SamplePlate8Slot;
