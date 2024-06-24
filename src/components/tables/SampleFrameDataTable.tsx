import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { FrameData } from "../../interfaces/FrameDataInterfaces";

interface Props {
  frameDataArr: FrameData[] | null;
  onClick: (tag: string) => void;
}

function SampleFrameDataTable({ frameDataArr, onClick }: Props) {
  return (
    <div
      style={{
        borderColor: "rgba(70, 70, 70, 1)",
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: "5px",
        padding: "8px",
        margin: "4px 20px 4px 4px",
      }}
    >
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Tag</th>
              <th>Frame Description</th>
              <th>Created</th>
              <th>Received</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {frameDataArr &&
              frameDataArr.map((frameData) => (
                <tr key={frameData.tag} onClick={() => onClick(frameData.tag)}>
                  <td>{frameData.tag}</td>
                  <td>{frameData.description}</td>
                  <td>{frameData.created ? frameData.created : "n/a"}</td>
                  <td>{frameData.received ? frameData.received : "n/a"}</td>
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
    </div>
  );
}

export default SampleFrameDataTable;
