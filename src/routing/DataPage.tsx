import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import XasPlotDefinition from "../components/XasPlotDefinition";
import XasPlot from "../components/XasPlot";

import {
  ChartOptions,
  DataPoint,
  XasData,
} from "../interfaces/XasDataInterfaces";
import SamplePlateDataTable from "../components/tables/SamplePlateDataTable";
import { FrameData } from "../interfaces/FrameDataInterfaces";
import TagSearchBox from "../components/TagSearchBox";
import ShortSamplePlateDataTable from "../components/tables/ShortSamplePlateDataTable";
import ShortSampleFrameDataTable from "../components/tables/ShortSampleFrameDataTable";
import XasPlotSweep from "../components/XasPlotSweep";
import { string } from "joi";

const defaultChartOptions: ChartOptions = {
  theme: "light1",
  animationEnabled: true,
  zoomEnabled: true,
  title: {
    text: "XAS Data",
    fontSize: 22,
    fontFamily: "tahoma",
  },
  axisX: {
    title: "E / eV",
    lineThickness: 1,
    gridColor: "black",
    gridDashType: "dot",
    gridThickness: 1,
    tickColor: "black",
    tickLength: 8,
    tickThickness: 1,
  },
  axisY: {
    title: "ln(I1/I2)",
    lineThickness: 1,
    gridColor: "black",
    gridDashType: "dot",
    gridThickness: 1,
    tickColor: "black",
    tickLength: 8,
    tickThickness: 1,
  },
  data: [],
};

interface XasDataId {
  _id: string;
}

const emptyXasData: XasData = {
  sample: {
    _id: "",
    samplePlate: "",
    description: "",
    position: "",
    scanSetups: [],
  },
  scanSetup: {
    _id: "",
    sample: "",
    element: "",
    edge: "",
    range: "",
    setup: "",
    sweeps: 0,
  },

  encoderResolution: 0,
  encoderOffset: 0,
  latticeSpacing: 0,

  adcOffset1: 0,
  adcOffset2: 0,
  adcOffset3: 0,
  adcOffset4: 0,

  encoder: [],
  energy: [],
  adc1: [],
  adc2: [],
  adc3: [],
  adc4: [],
  time: [],
  gate: [],
};

const emptyFrameData: FrameData = {
  _id: "",
  tag: "",
  user: "",
  committed: false,
  description: "",
  created: "",
  received: "",
  dataAvailable: false,
  samplePlateL: {
    _id: "",
    sampleFrame: "",
    type: 0,
    samples: [],
  },
  samplePlateR: {
    _id: "",
    sampleFrame: "",
    type: 0,
    samples: [],
  },
};

function DataPage() {
  const [tag, setTag] = useState("");
  const [selectedRow, setSelectedRow] = useState("");

  const [xasSampleData, setXasSampleData] = useState<DataPoint[]>([]);
  const [numerator, setNumerator] = useState(1);
  const [denominator, setDenominator] = useState(2);
  const [log, setLog] = useState(true);
  const [yTitle, setYTitle] = useState("");
  const [enableXasPlot, setEnableXasPlot] = useState(false);

  const [xasData, setXasData] = useState<XasData>();
  const [frameDataArr, setFrameDataArr] = useState<FrameData[]>();
  const [frameData, setFrameData] = useState<FrameData>();

  const [sweep, setSweep] = useState(1);
  const [maxSweep, setMaxSweep] = useState(1);

  const [xasDataIdList, setXasDataIdList] = useState<XasDataId[]>([]);

  const GetXasDataIdList = (sampleId: string, scanId: string) => {
    apiClient
      .get<XasDataId[]>(`/xasData/count/${sampleId}/${scanId}`, {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      })
      .then((res) => {
        setXasDataIdList(res.data);
        setSweep(1);

        if (res.data.length < 1) {
          setMaxSweep(1);
          setXasData(emptyXasData);
          setEnableXasPlot(false);
        } else {
          setMaxSweep(res.data.length);
          setEnableXasPlot(true);
        }

        console.log("GetXasDataIdList", res.data);
      })
      .catch((error) => {
        setXasDataIdList([]);
        setMaxSweep(1);
        setXasData(emptyXasData);
        setEnableXasPlot(false);
        console.log("GetXasDataIdList", error.message.data);
      })
      .finally(() => {
        console.log("DONE");
      });
  };

  const ResetPage = () => {
    setSelectedRow("");
    setSweep(1);
    setMaxSweep(1);
    setXasDataIdList([]);
    setXasData(emptyXasData);
    setEnableXasPlot(false);
  };

  const GetXasData = (id: string) => {
    apiClient
      .get<XasData>(`/xasData/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      })
      .then((res) => {
        setXasData(res.data);
        setEnableXasPlot(true);
        //console.log("GetXasData",res.data);
      })
      .catch((error) => {
        ResetPage();
        console.log(error.message.data);
      })
      .finally(() => {
        //console.log("DONE");
      });
  };

  // get FrameDataArr for table
  useEffect(() => {
    apiClient
      .get<FrameData[]>("/sampleFrames", {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      })
      .then((res) => {
        setFrameDataArr([...res.data]);
      })
      .catch((error) => {
        ResetPage();
        console.log("GetFrameDataArrForTable", error.message.data);
      })
      .finally(() => {
        console.log("UPDATE DONE");
      });
  }, []);

  // get FrameData by TAG
  useEffect(() => {
    if (tag === "") return;

    apiClient
      .get<FrameData>(`/sampleFrames/${tag}`, {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      })
      .then((res) => {
        setFrameData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        ResetPage();
        //setFrameData(emptyFrameData);
        //console.log("GetFrameDataByTag",error.message.data);
      })
      .finally(() => {
        //console.log("DONE");
      });
  }, [tag]);

  // get XasData
  useEffect(() => {
    if (!xasDataIdList || xasDataIdList.length === 0) return;
    GetXasData(xasDataIdList[sweep - 1]._id);
  }, [xasDataIdList, sweep]);

  // replot chart
  useEffect(() => {
    if (!xasData) return;

    let spectrum: DataPoint[] = [];
    let aStr = "";
    let bStr = "";

    switch (numerator) {
      case 1:
        aStr = "ADC_1";
        break;

      case 2:
        aStr = "ADC_2";
        break;

      case 3:
        aStr = "ADC_3";
        break;

      case 4:
        aStr = "ADC_4";
        break;

      case 5:
        aStr = "1.0";
        break;
    }

    switch (denominator) {
      case 1:
        bStr = "ADC_1";
        break;

      case 2:
        bStr = "ADC_2";
        break;

      case 3:
        bStr = "ADC_3";
        break;

      case 4:
        bStr = "ADC_4";
        break;

      case 5:
        bStr = "1.0";
        break;
    }

    for (var i = 0; i < xasData.energy.length - 9; i++) {
      let dataPoint = { x: 0, y: 0 };
      dataPoint.x = xasData.energy[i];

      let a = 0;
      let b = 1.0;

      switch (numerator) {
        case 1:
          a = xasData.adc1[i];
          break;

        case 2:
          a = xasData.adc2[i];
          break;

        case 3:
          a = xasData.adc3[i];
          break;

        case 4:
          a = xasData.adc4[i];
          break;

        case 5:
          a = 1.0;
          break;
      }

      switch (denominator) {
        case 1:
          b = xasData.adc1[i];
          break;

        case 2:
          b = xasData.adc2[i];
          break;

        case 3:
          b = xasData.adc3[i];
          break;

        case 4:
          b = xasData.adc4[i];
          break;

        case 5:
          b = 1.0;
          break;
      }

      dataPoint.y = log ? Math.log(a / b) : a / b;
      spectrum.push(dataPoint);
    }

    let title = log ? `log(${aStr}/${bStr})` : `${aStr}/${bStr}`;
    setYTitle(title);
    setXasSampleData(spectrum);
  }, [xasData, numerator, denominator, log]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2">
          <div className="mb-2">
            <XasPlotDefinition
              onNumeratorChange={(numerator) => setNumerator(numerator)}
              onDenominatorChange={(denominator) => setDenominator(denominator)}
              onLogChange={(log) => setLog(log)}
            />
          </div>
          <div className="mb-2">
            <XasPlotSweep
              min={1}
              max={maxSweep}
              current={sweep}
              onChange={(i) => {
                setSweep(sweep + i);
              }}
              onReset={() => setSweep(1)}
            />
          </div>
        </div>
        <div className="col-10">
          <XasPlot
            title={xasData ? `${xasData?.sample.description}-${sweep}` : ""}
            yTitle={yTitle}
            options={defaultChartOptions}
            data={xasSampleData}
            enable={enableXasPlot}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-5">
          <ShortSampleFrameDataTable
            frameDataArr={frameDataArr ? frameDataArr : null}
            onClick={(tag) => {
              setTag(tag);
              ResetPage();
            }}
            selectedRow={tag}
          />
        </div>

        <div className="col-7">
          <ShortSamplePlateDataTable
            dataL={frameData ? frameData.samplePlateL : null}
            dataR={frameData ? frameData.samplePlateR : null}
            selectedRow={selectedRow}
            onClick={(sampleId, scanId) => {
              setSelectedRow(`${sampleId}-${scanId}`);
              GetXasDataIdList(sampleId, scanId);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DataPage;
