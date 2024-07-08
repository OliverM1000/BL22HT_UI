// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";
import { ChartOptions, DataPoint } from "../interfaces/XasDataInterfaces";
import Overlay from "./Overlay";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

let CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface Props {
  title: string;
  yTitle: string;
  data: DataPoint[];
  options: ChartOptions;
  enable: boolean;
}

function XasPlot({ title, yTitle, data, options, enable }: Props) {
  return (
    <div
      style={{
        borderColor: "rgba(70, 70, 70, 1)",
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: "5px",
        //marginBottom: "8px",
        //margin: "4px 20px 8px 4px",
        padding: "8px",
        position: "relative",
        marginRight: "20px",
        marginBottom: "20px",
      }}
    >
      {!enable && <Overlay />}
      <div className="">
        <CanvasJSChart
          options={{
            ...options,
            title: { ...options.title, text: title },
            axisY: { ...options.axisY, title: yTitle },
            data: [{ type: "line", dataPoints: data }],
          }}
        />
      </div>
    </div>
  );
}

export default XasPlot;
