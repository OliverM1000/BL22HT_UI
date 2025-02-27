import SamplePlate8Slot from "../samplePlates/SamplePlate8Slot";
import SamplePlate8Circle from "../samplePlates/SamplePlate8Circle";
import SamplePlateEmpty from "../samplePlates/SamplePlateEmpty";
import SampleFrame from "../components/SampleFrame";
import { useEffect, useState } from "react";
import SampleFrameSetup, {
  SampleFrameFormData,
} from "../components/SampleFrameSetup";
import SampleSetup, { SampleSetupData } from "../components/SampleSetup";
import ScanSetup, { ScanSetupFormData } from "../components/ScanSetup";
import apiClient from "../services/api-client";
import Overlay from "../components/Overlay";
import SimpleSamplePlateDataTable from "../components/tables/SimpleSamplePlateDataTable";
import { FrameData } from "../interfaces/FrameDataInterfaces";
import SamplePlate6CircleGas from "../samplePlates/SamplePlate6CircleGas";

interface SelectedSample {
  arrayIndex: number;
  samplePlateId: string;
  sampleId: string;
  samplePosition: string;
  sampleDescription: string;
}
interface SampleStates {
  left: number[];
  right: number[];
}

interface SamplePlateUiState {
  states: SampleStates;
  selected: SelectedSample;
}

function SamplePlateSwitch(
  i: number,
  states: number[],
  onClick: (id: number, position: string) => void
) {
  switch (i) {
    case 1:
      return <SamplePlate8Slot states={states} onClick={onClick} />;

    case 2:
      return <SamplePlate8Circle states={states} onClick={onClick} />;

    case 3:
      return <SamplePlate6CircleGas states={states} onClick={onClick} />;

    default:
      return <SamplePlateEmpty />;
  }
}

function CreatePage() {
  const [update, setUpdate] = useState(false);
  const [disableFrameSetup, setDisableFrameSetup] = useState(false);
  const [showScanSetup, setShowScanSetup] = useState(false);

  const [frameData, setFrameData] = useState<FrameData>({
    _id: "",
    tag: "0000-0000",
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
      samples: [
        {
          _id: "",
          samplePlate: "",
          description: "",
          position: "",
          scanSetups: [
            {
              _id: "",
              sample: "",
              element: "",
              edge: "",
              range: "",
              setup: "",
              sweeps: 0,
            },
          ],
        },
      ],
    },
    samplePlateR: {
      _id: "",
      sampleFrame: "",
      type: 0,
      samples: [
        {
          _id: "",
          samplePlate: "",
          description: "",
          position: "",
          scanSetups: [
            {
              _id: "",
              sample: "",
              element: "",
              edge: "",
              range: "",
              setup: "",
              sweeps: 0,
            },
          ],
        },
      ],
    },
  });

  const [uiStates, setUiStates] = useState<SamplePlateUiState>({
    states: {
      left: [0, 0, 0, 0, 0, 0, 0, 0],
      right: [0, 0, 0, 0, 0, 0, 0, 0],
    },
    selected: {
      arrayIndex: -1,
      samplePlateId: "",
      sampleId: "",
      samplePosition: "",
      sampleDescription: "",
    },
  });

  const lookup: { [key: string]: number } = {
    "Left-A": 0,
    "Left-B": 1,
    "Left-C": 2,
    "Left-D": 3,
    "Left-E": 4,
    "Left-F": 5,
    "Left-G": 6,
    "Left-H": 7,
    "Right-A": 0,
    "Right-B": 1,
    "Right-C": 2,
    "Right-D": 3,
    "Right-E": 4,
    "Right-F": 5,
    "Right-G": 6,
    "Right-H": 7,
  };

  useEffect(() => {
    if (update) console.log("UPDATE");

    apiClient
      .get<FrameData>("/create/frame", {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      })
      .then((res) => {
        setFrameData(res.data);

        // handle LEFT states
        let statesL = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < res.data.samplePlateL.samples.length; i++) {
          statesL[lookup[res.data.samplePlateL.samples[i].position]] = 1;
        }

        // handle RIGHT states
        let statesR = [0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < res.data.samplePlateR.samples.length; i++) {
          statesR[lookup[res.data.samplePlateR.samples[i].position]] = 1;
        }

        setUiStates({
          states: {
            left: [...statesL],
            right: [...statesR],
          },
          selected: {
            arrayIndex: -1,
            samplePlateId: "",
            sampleId: "",
            samplePosition: "",
            sampleDescription: "",
          },
        });

        if (res.data._id) setDisableFrameSetup(true);
      })
      .catch((error) => console.log(error.message.data))
      .finally(() => {
        console.log("UPDATE DONE");
      });
  }, [disableFrameSetup, update]);

  const handleClickL = (id: number, position: string) => {
    let states = {
      left: [0, 0, 0, 0, 0, 0, 0, 0],
      right: [0, 0, 0, 0, 0, 0, 0, 0],
      center: [0, 0, 0, 0, 0, 0],
    };

    let description = "";
    let sampleId = "";

    setShowScanSetup(false);

    // handle LEFT states
    if (frameData.samplePlateL && frameData.samplePlateL.samples) {
      for (let i = 0; i < frameData.samplePlateL.samples.length; i++) {
        states.left[lookup[frameData.samplePlateL.samples[i].position]] = 1;

        if (
          frameData.samplePlateL.samples[i].position.split("-")[1] === position
        ) {
          description = frameData.samplePlateL.samples[i].description;
          sampleId = frameData.samplePlateL.samples[i]._id;
          setShowScanSetup(true);
        }
      }
    }
    states.left[id] = 2;

    // handle RIGHT states
    if (frameData.samplePlateR && frameData.samplePlateR.samples) {
      for (let i = 0; i < frameData.samplePlateR.samples.length; i++) {
        states.right[lookup[frameData.samplePlateR.samples[i].position]] = 1;
      }
    }

    setUiStates({
      states: { ...states },
      selected: {
        arrayIndex: id,
        samplePlateId: frameData ? frameData.samplePlateL._id : "",
        sampleId: sampleId,
        samplePosition: `Left-${position}`,
        sampleDescription: description,
      },
    });
  };

  const handleClickR = (id: number, position: string) => {
    let states = {
      left: [0, 0, 0, 0, 0, 0, 0, 0],
      right: [0, 0, 0, 0, 0, 0, 0, 0],
    };

    let description = "";
    let sampleId = "";

    setShowScanSetup(false);

    // handle LEFT states
    if (frameData.samplePlateL && frameData.samplePlateL.samples) {
      for (let i = 0; i < frameData.samplePlateL.samples.length; i++) {
        states.left[lookup[frameData.samplePlateL.samples[i].position]] = 1;
      }
    }

    // handle RIGHT states
    if (frameData.samplePlateR && frameData.samplePlateR.samples) {
      for (let i = 0; i < frameData.samplePlateR.samples.length; i++) {
        states.right[lookup[frameData.samplePlateR.samples[i].position]] = 1;

        if (
          frameData.samplePlateR.samples[i].position.split("-")[1] === position
        ) {
          description = frameData.samplePlateR.samples[i].description;
          sampleId = frameData.samplePlateR.samples[i]._id;
          setShowScanSetup(true);
        }
      }
    }
    states.right[id] = 2;

    setUiStates({
      states: { ...states },
      selected: {
        arrayIndex: id,
        samplePlateId: frameData ? frameData.samplePlateR._id : "",
        sampleId: sampleId,
        samplePosition: `Right-${position}`,
        sampleDescription: description,
      },
    });
  };

  const AddFrame = async (data: SampleFrameFormData) => {
    console.log(data);

    // ToDo: DISPLAY ERROR MESSAGE !!!!

    const res = await apiClient.get<{ tag: string; isUnique: boolean }>(
      `/sampleFrames/isUnique/${frameData.tag}`,
      {
        headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
      }
    );
    if (!res.data.isUnique) return;

    apiClient
      .post(
        "/create/frame",
        { ...data, tag: frameData.tag, commited: false },
        {
          headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
        }
      )
      .then((res) => {
        setDisableFrameSetup(true);
      })
      .catch((error) => console.log("ERROR", error.response.data));
  };

  const AddSample = (data: SampleSetupData) => {
    console.log("AddSample");

    apiClient
      .post(
        "/create/sample",
        { ...data, tag: frameData.tag },
        {
          headers: {
            "x-auth-token": localStorage.getItem("x-auth-token"),
          },
        }
      )
      .then((res) => {
        console.log("ADD SAMPLE", res.data);

        let states = {
          left: uiStates.states.left.map((i) => (i > 1 ? 1 : i)),
          right: uiStates.states.right.map((i) => (i > 1 ? 1 : i)),
        };

        setUiStates({
          states: { ...states },
          selected: {
            arrayIndex: lookup[res.data.position],
            samplePlateId: res.data.samplePlate,
            sampleId: res.data._id,
            samplePosition: res.data.position,
            sampleDescription: res.data.description,
          },
        });

        setUpdate(!update);
      })
      .catch((error) => console.log("ERROR", error.response.data))
      .finally(() => {
        console.log("AddSample Complete");
      });
  };

  const AddScan = (data: ScanSetupFormData) => {
    console.log("AddScan");
    let sampleId = "";

    sampleId = uiStates.selected.sampleId;

    apiClient
      .post(
        "/create/scan",
        { ...data, sampleId: sampleId },
        {
          headers: {
            "x-auth-token": localStorage.getItem("x-auth-token"),
          },
        }
      )
      .then((res) => {
        setUpdate(!update);
      })
      .catch((error) => console.log("ERROR", error.response.data))
      .finally(() => {
        console.log("AddScan Complete");
      });

    setShowScanSetup(false);
  };

  const DeleteSample = (id: string) => {
    console.log("DeleteSample");
    apiClient
      .delete(`/create/sample/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setUpdate(!update);
        setShowScanSetup(false);
      })
      .catch((error) => console.log("ERROR", error.response.data))
      .finally(() => console.log("DeleteSample Done"));
  };

  const DeleteScan = (id: string) => {
    console.log("DeleteScan");
    apiClient
      .delete(`/create/scan/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setUpdate(!update);
      })
      .catch((error) => console.log("ERROR", error.response.data))
      .finally(() => console.log("DeleteScan Done"));
  };

  const HandleCommit = () => {
    console.log("HandleCommit");

    apiClient
      .put(
        "/create/frame/",
        { user: frameData.user, tag: frameData.tag },
        {
          headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
        }
      )
      .then((res) => {
        setUiStates({
          states: {
            left: [0, 0, 0, 0, 0, 0, 0, 0],
            right: [0, 0, 0, 0, 0, 0, 0, 0],
          },
          selected: {
            arrayIndex: -1,
            samplePlateId: "",
            sampleId: "",
            samplePosition: "",
            sampleDescription: "",
          },
        });
      })
      .catch((error) => console.log(error.message.data))
      .finally(() => {
        setUpdate(!update);
        setDisableFrameSetup(false);
        console.log("HandleCommit Done");
      });
  };

  const HandleReset = () => {
    console.log("HandleReset");

    apiClient
      .delete(`/create/frame/${frameData.tag}`, {
        headers: { "x-auth-token": localStorage.getItem("x-auth-token") },
      })
      .then((res) => {
        setUiStates({
          states: {
            left: [0, 0, 0, 0, 0, 0, 0, 0],
            right: [0, 0, 0, 0, 0, 0, 0, 0],
          },
          selected: {
            arrayIndex: -1,
            samplePlateId: "",
            sampleId: "",
            samplePosition: "",
            sampleDescription: "",
          },
        });
      })
      .catch((error) => console.log("ERROR", error.response.data))
      .finally(() => {
        setUpdate(!update);
        setDisableFrameSetup(false);
        console.log("HandleReset Done");
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6">
          {!disableFrameSetup && (
            <div
              style={{
                borderColor: "rgba(70, 70, 70, 1)",
                borderStyle: "solid",
                borderWidth: "1px",
                borderRadius: "5px",
                marginBottom: "8px",
                padding: "8px",
                position: "relative",
              }}
            >
              {disableFrameSetup && <Overlay />}
              <SampleFrameSetup
                data={{
                  tag: frameData.tag,
                  samplePlateTypeL: frameData.samplePlateL
                    ? frameData.samplePlateL.type
                    : 0,
                  samplePlateTypeR: frameData.samplePlateR
                    ? frameData.samplePlateR.type
                    : 0,
                  description: frameData.description,
                }}
                setTag={(tag) => {
                  setFrameData({
                    ...frameData,
                    tag: tag.length > 9 ? tag.substring(0, 9) : tag,
                  });
                }}
                setTypeL={(type) => {
                  console.log(type);
                  setFrameData({
                    ...frameData,
                    samplePlateL: { ...frameData.samplePlateL, type: type },
                  });
                }}
                setTypeR={(type) => {
                  setFrameData({
                    ...frameData,
                    samplePlateR: { ...frameData.samplePlateR, type: type },
                  });
                }}
                onSubmit={AddFrame}
              />
            </div>
          )}

          {disableFrameSetup && (
            <>
              <div
                style={{
                  borderColor: "rgba(70, 70, 70, 1)",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderRadius: "5px",
                  marginBottom: "8px",
                  padding: "8px",
                }}
              >
                <SampleSetup
                  disableEdit={showScanSetup}
                  slot={uiStates.selected}
                  onSubmit={AddSample}
                  onDelete={DeleteSample}
                />
              </div>

              <>
                <div
                  style={{
                    borderColor: "rgba(70, 70, 70, 1)",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderRadius: "5px",
                    padding: "8px",
                    marginBottom: "8px",
                    position: "relative",
                  }}
                >
                  {!showScanSetup && <Overlay />}
                  <ScanSetup onSubmit={AddScan} />
                </div>
              </>
            </>
          )}

          {disableFrameSetup && (
            <div style={{ display: "flex" }} className="mb-2">
              <div style={{ marginLeft: "auto" }}>
                <button className="btn btn-danger mx-2" onClick={HandleReset}>
                  Start Over
                </button>
                <button className="btn btn-success" onClick={HandleCommit}>
                  Commit
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="col-6">
          <SampleFrame
            code={frameData.tag}
            plateL={SamplePlateSwitch(
              frameData.samplePlateL ? frameData.samplePlateL.type : 0,
              uiStates.states.left,
              handleClickL
            )}
            plateR={SamplePlateSwitch(
              frameData.samplePlateR ? frameData.samplePlateR.type : 0,
              uiStates.states.right,
              handleClickR
            )}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <SimpleSamplePlateDataTable
            data={frameData.samplePlateL}
            title="Left Plate"
            description={frameData.description}
            showDelete={true}
            onDelete={(id) => {
              DeleteScan(id);
            }}
            onClick={() => {}}
          />
          <SimpleSamplePlateDataTable
            data={frameData.samplePlateR}
            title="Right Plate"
            description={frameData.description}
            showDelete={true}
            onDelete={(id) => {
              DeleteScan(id);
            }}
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
