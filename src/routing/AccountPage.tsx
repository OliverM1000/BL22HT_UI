import apiClient from "../services/api-client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPenToSquare, FaArrowRightFromBracket } from "react-icons/fa6";
import ShippingAddressForm from "../forms/ShippingAddressForm";

interface Address {
  affiliation: string;
  street: string;
  city: string;
  zip: number;
  state: string;
  country: string;
}

interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
}

function AccountPage() {
  const navigate = useNavigate();

  const emptyUser = {
    _id: "",
    first_name: "empty",
    last_name: "empty",
    email: "empty",
  };
  const emptyAddress = {
    affiliation: "empty",
    street: "empty",
    city: "empty",
    zip: 10000,
    state: "empty",
    country: "empty",
  };

  const [editShipping, setEditShipping] = useState(false);
  const [user, setUser] = useState<User>(emptyUser);
  const [address, setAddress] = useState<Address>(emptyAddress);

  const HandleLogout = () => {
    localStorage.setItem("x-auth-token", "");
    navigate("/");
  };

  useEffect(() => {
    apiClient
      .get("/users/me", {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      })
      .then((res) => {
        setUser({ ...res.data });
        setAddress({ ...res.data.shipping_address });
      })
      .catch((error) => console.log(error.message.data));
  }, [editShipping]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            borderColor: "rgba(70, 70, 70, 1)",
            borderStyle: "solid",
            borderWidth: "1px",
            borderRadius: "5px",
            padding: "16px",
            width: "400px",
          }}
        >
          <h3 className="mb-3">Account Info</h3>
          <div className="mb-1">
            <span className="">First Name: </span>
            <span className="">{user ? user.first_name : "error"}</span>
          </div>
          <div className="mb-1">
            <span className="">Last Name: </span>
            <span className="">{user ? user.last_name : "error"}</span>
          </div>
          <div className="mb-1">
            <span className="">Email Address: </span>
            <span className="">{user ? user.email : "error"}</span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {!editShipping && (
          <div
            style={{
              borderColor: "rgba(70, 70, 70, 1)",
              borderStyle: "solid",
              borderWidth: "1px",
              borderRadius: "5px",
              padding: "16px",
              width: "400px",
            }}
          >
            <div style={{ display: "flex" }} className="mb-3">
              <h3>Shipping Address</h3>
              <span
                style={{ marginLeft: "auto" }}
                onClick={() => setEditShipping(true)}
              >
                <FaPenToSquare size={20} />
              </span>
            </div>
            <div className="mb-1">
              <span className="">Affiliation: </span>
              <span className="">{address ? address.affiliation : ""}</span>
            </div>
            <div className="mb-1">
              <span className="">Street: </span>
              <span className="">{address ? address.street : ""}</span>
            </div>
            <div className="mb-1">
              <span className="">Zip: </span>
              <span className="">{address ? address.zip : ""}</span>
            </div>
            <div className="mb-1">
              <span className="">City: </span>
              <span className="">{address ? address.city : ""}</span>
            </div>
            <div className="mb-1">
              <span className="">State: </span>
              <span className="">{address ? address.state : ""}</span>
            </div>
            <div className="mb-1">
              <span className="">Country: </span>
              <span className="">{address ? address.country : ""}</span>
            </div>
          </div>
        )}

        {editShipping && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                borderColor: "rgba(70, 70, 70, 1)",
                borderStyle: "solid",
                borderWidth: "1px",
                borderRadius: "5px",
                padding: "16px",
                width: "400px",
              }}
            >
              <h3 className="mb-3">Shipping Address</h3>
              <ShippingAddressForm
                userId={user._id}
                shippingAddress={address}
                cancel={() => setEditShipping(false)}
                update={() => setEditShipping(false)}
              />
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: "0px",
            width: "400px",
          }}
        >
          <div style={{ float: "right" }}>
            <button className="btn btn-secondary" onClick={HandleLogout}>
              <span className="mx-2">Logout</span>
              <FaArrowRightFromBracket size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountPage;
