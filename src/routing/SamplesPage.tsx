import React, { useEffect, useState } from "react";
import SampleFrameDataTable from "../components/SampleFrameDataTable";
import apiClient from "../services/api-client";
import SamplePlateDataTable from "../components/SamplePlateDataTable";

interface SampleFrameData {
  tag: string;
  description: string;
  created: string;
  received: string;
  dataAvailable: boolean;
  samplePlateL: PlateData;
  samplePlateR: PlateData;
}
interface PlateData {
  _id: string;
  sampleFrame: string;
  type: number;
  samples: SampleData[];
}

interface SampleData {
  _id: string;
  samplePlate: string;
  description: string;
  position: string;
  scanSetups: ScanData[];
}

interface ScanData {
  _id: string;
  sample: string;
  element: string;
  edge: string;
  range: string;
  setup: string;
  sweeps: number;
}

function Samples() {
  const [frameDataArr, setFrameDataArr] = useState<SampleFrameData[]>();
  const [selectedFrame, setSelectedFrame] = useState<string>();

  useEffect(() => {
    apiClient
      .get<SampleFrameData[]>("/sampleFrames", {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setFrameDataArr([...res.data]);
      })
      .catch((error) => console.log(error.message.data))
      .finally(() => {
        console.log("UPDATE DONE");
      });
  }, []);

  const GetSamplePlateData = (arr: SampleFrameData[], left: boolean) => {
    if (!SampleFrameDataTable) return null;

    let idx = -1;
    let id = frameDataArr?.findIndex(
      (frameData) => frameData.tag === selectedFrame
    );

    if (typeof id != "undefined" && id > -1) idx = id;

    //console.log(id, idx, arr[idx]);

    if (left) return idx > -1 ? arr[idx].samplePlateL : null;
    else return idx > -1 ? arr[idx].samplePlateR : null;
  };

  return (
    <div>
      <SampleFrameDataTable
        sampleFrameDataArr={frameDataArr ? frameDataArr : null}
        onClick={(tag) => setSelectedFrame(tag)}
      />
      <SamplePlateDataTable
        tag={selectedFrame ? selectedFrame : ""}
        samplePlateDescriptionL=""
        samplePlateDescriptionR=""
        samplePlateDataL={
          frameDataArr ? GetSamplePlateData(frameDataArr, true) : null
        }
        samplePlateDataR={
          frameDataArr ? GetSamplePlateData(frameDataArr, false) : null
        }
        onClick={(id) => console.log(id)}
      />
    </div>
  );
}

export default Samples;
