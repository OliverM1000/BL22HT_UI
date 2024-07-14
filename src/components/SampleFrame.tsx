import { ReactNode } from "react";
import Barcode from "react-barcode";
import frame from "../assets/Frame.png";

interface Props {
  code: string;
  plateL: ReactNode;
  plateR: ReactNode;
}

function SampleFrame({ code, plateL, plateR }: Props) {
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "455px",
          height: "631px",
        }}
      >
        <div style={{ position: "absolute" }}>
          <img src={frame} />
        </div>
        <div
          style={{
            position: "absolute",
            left: "0px",
            top: "147px",
            width: "100%",
            zIndex: "2",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Barcode
              value={code}
              height={50}
              width={2}
              background="#e6e6e6"
              margin={2}
            />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: "0px",
            top: "0px",
          }}
        >
          {plateL}
        </div>
        <div
          style={{
            position: "absolute",
            left: "172px",
            top: "0px",
          }}
        >
          {plateR}
        </div>
      </div>
    </>
  );
}

export default SampleFrame;
