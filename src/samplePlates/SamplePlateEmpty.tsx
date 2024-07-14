import samplePlateEmpty from "../assets/Empty.png";

function SamplePlateEmpty() {
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
        {false && (
          <img
            src={samplePlateEmpty}
            style={{
              position: "absolute",
              left: "0px",
              top: "0px",
              maxWidth: "100%",
              zIndex: "2",
            }}
          />
        )}
      </div>
    </>
  );
}

export default SamplePlateEmpty;
