import { FaUserGear, FaVial, FaDatabase } from "react-icons/fa6";
import { TbLayoutGridAdd } from "react-icons/tb";
import { Outlet, useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2 className="px-1 pt-1">BL22HT</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <div className="list-group list-group-flush">
            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/main/create")}
            >
              <TbLayoutGridAdd size={24} />
              <span style={{ paddingLeft: "12px" }}>Create</span>
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/main/samples")}
            >
              <FaVial size={20} />
              <span style={{ paddingLeft: "16px" }}>Samples</span>
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/main/data")}
            >
              <FaDatabase size={20} />
              <span style={{ paddingLeft: "16px" }}>Data</span>
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/main/account")}
            >
              <FaUserGear size={20} />
              <span style={{ paddingLeft: "16px" }}>Account</span>
            </button>
          </div>
        </div>
        <div className="col-10 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
