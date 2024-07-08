import React, { useEffect, useState } from "react";
import SampleFrameDataTable from "../components/tables/SampleFrameDataTable";
import apiClient from "../services/api-client";
import SamplePlateDataTable from "../components/tables/SamplePlateDataTable";
import { FrameData } from "../interfaces/FrameDataInterfaces";

function Samples() {
  const [frameDataArr, setFrameDataArr] = useState<FrameData[]>();
  const [selectedFrame, setSelectedFrame] = useState<string>();

  useEffect(() => {
    apiClient
      .get<FrameData[]>("/sampleFrames", {
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

  const GetSamplePlateData = (arr: FrameData[], left: boolean) => {
    if (!SampleFrameDataTable) return null;

    let idx = -1;
    let id = frameDataArr?.findIndex(
      (frameData) => frameData.tag === selectedFrame
    );

    if (typeof id != "undefined" && id > -1) idx = id;

    if (left) {
      return idx > -1 ? arr[idx].samplePlateL : null;
    } else {
      return idx > -1 ? arr[idx].samplePlateR : null;
    }
  };

  return (
    <div>
      <SampleFrameDataTable
        frameDataArr={frameDataArr ? frameDataArr : null}
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
