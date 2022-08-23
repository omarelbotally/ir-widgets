import React, { useEffect, useState } from "react";
import "./business-segments-tabs.css";
import axios from "axios";
import Api from "../../Api/Api";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

function Businesssegmentstabs() {
  const [salesData, setSalesData] = useState([]);
  const [costOfSalesData, setCostOfSalesData] = useState([]);
  const [netIncomeData, setNetIncomeData] = useState([]);
  const [totalAssetsData, setTotalAssetsData] = useState([]);
  const [totalLiabilitiesData, setTotalLiabilitiesData] = useState([]);
  const [currency, setCurrency] = useState("Riyal");
  const [fiscalPeriodType, setFiscalPeriodType] = useState("year");

  useEffect(() => {
    Api.getAccessToken();

    axios
      .get(
        `https://data.argaam.com/api/v1.0/json/ir-api/business-segments?fiscalPeriodType=${fiscalPeriodType}&currency=${currency}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setTimeout(() => {
          setSalesData(response.data.fsFields[3].businessSegments);
          setCostOfSalesData(response.data.fsFields[4].businessSegments);
          setNetIncomeData(response.data.fsFields[0].businessSegments);
          setTotalAssetsData(response.data.fsFields[1].businessSegments);
          setTotalLiabilitiesData(response.data.fsFields[2].businessSegments);
          console.log(response.data);
          console.log(salesData);
        }, 2000);
      });
  }, [fiscalPeriodType, currency]);
  return (
    <div className="business-segments container">
      <div className="header-of-tabs">
        <div className="tabs-container">
          <span className="tabs">
            {" "}
            <a
              className="btn btn-light"
              id="annual"
              onClick={() => {
                setFiscalPeriodType("year");
                document.getElementById("annual").classList.add("active");
                document.getElementById("quarter").classList.remove("active");
                document.getElementById("interim").classList.remove("active");
              }}
            >
              ANNUAL
            </a>
          </span>
          <span className="tabs">
            {" "}
            <a
              className="btn btn-light"
              id="quarter"
              onClick={() => {
                setFiscalPeriodType("quarter");
                document.getElementById("annual").classList.remove("active");
                document.getElementById("quarter").classList.add("active");
                document.getElementById("interim").classList.remove("active");
              }}
            >
              QUARTER
            </a>
          </span>
          <span className="tabs">
            {" "}
            <a
              className="btn btn-light"
              id="interim"
              onClick={() => {
                setFiscalPeriodType("Interim");
                document.getElementById("annual").classList.remove("active");
                document.getElementById("quarter").classList.remove("active");
                document.getElementById("interim").classList.add("active");
              }}
            >
              INTERIM
            </a>
          </span>
        </div>

        <div className="currency-container text-end">
          <div className="currency">
            <span>Currency : </span>

            <span>
              <a
                className="btn btn-light"
                id="riyal-btn"
                onClick={() => {
                  document.getElementById("riyal-btn").classList.add("active");
                  document.getElementById("usd-btn").classList.remove("active");
                  setCurrency("RIYAL");
                }}
              >
                RIYAL
              </a>
            </span>
            <span>
              <button
                className="btn btn-light"
                id="usd-btn"
                onClick={() => {
                  document.getElementById("usd-btn").classList.add("active");
                  document
                    .getElementById("riyal-btn")
                    .classList.remove("active");
                  setCurrency("USD");
                }}
              >
                USD
              </button>
            </span>
          </div>

          <div className="my-5">
            <table className="center" style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td>
                    <BsFillArrowLeftCircleFill />
                  </td>

                  {salesData[0].businessSegmentNameEn}

                  <td>
                    <BsFillArrowRightCircleFill />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="tabs-salesData"></div>
    </div>
  );
}

export default Businesssegmentstabs;
