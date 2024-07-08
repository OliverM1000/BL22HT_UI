import { FrameData } from "../../interfaces/FrameDataInterfaces";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";

interface Props {
  frameDataArr: FrameData[] | null;
  selectedRow: string;
  onClick: (tag: string) => void;
}

function ShortSampleFrameDataTable({
  frameDataArr,
  selectedRow,
  onClick,
}: Props) {
  return (
    <div
      style={{
        borderColor: "rgba(70, 70, 70, 1)",
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: "5px",
        padding: "8px",
        //margin: "4px 20px 4px 4px",
        marginLeft: "4px",
      }}
    >
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Tag</th>
            <th>Frame Description</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {frameDataArr &&
            frameDataArr.map((frameData) => (
              <tr
                key={frameData.tag}
                className={selectedRow === frameData.tag ? "table-success" : ""}
                onClick={() => onClick(frameData.tag)}
              >
                <td>{frameData.tag}</td>
                <td>{frameData.description}</td>
                <td>
                  {frameData.dataAvailable ? (
                    <BsCheckCircle size={20} color={"green"} />
                  ) : (
                    <BsXCircle size={20} color={"red"} />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShortSampleFrameDataTable;
