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
  const [loading, setLoading] = useState(false);

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
        setSalesData(response.data.fsFields[3].businessSegments);
        setCostOfSalesData(response.data.fsFields[4].businessSegments);
        setNetIncomeData(response.data.fsFields[0].businessSegments);
        setTotalAssetsData(response.data.fsFields[1].businessSegments);
        setTotalLiabilitiesData(response.data.fsFields[2].businessSegments);
        setTimeout(() => {
          setLoading(true);
          console.log(response.data);
          console.log(salesData);
        }, 1000);
      });
  }, [fiscalPeriodType, currency]);

  if (!loading) {
    return <div>loading...</div>;
  } else {
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
                    document
                      .getElementById("riyal-btn")
                      .classList.add("active");
                    document
                      .getElementById("usd-btn")
                      .classList.remove("active");
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
                  <tr style={{ backgroundColor: "white", padding: "20px" }}>
                    <td>
                      <BsFillArrowLeftCircleFill />
                    </td>

                    <td>{salesData[0].periodicValues[0].forDate}</td>

                    <td>{salesData[0].periodicValues[1].forDate}</td>

                    <td>{salesData[0].periodicValues[2].forDate}</td>

                    <td>{salesData[0].periodicValues[3].forDate}</td>

                    <td>{salesData[0].periodicValues[4].forDate}</td>

                    <td>{salesData[0].periodicValues[5].forDate}</td>

                    <td>
                      <BsFillArrowRightCircleFill />
                    </td>
                  </tr>

                  <tr
                    style={{
                      backgroundColor: "white !important",
                      height: "10px",
                    }}
                  >
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr style={{ fontSize: "25px" }}>
                    <td> net Income</td>
                  </tr>
                  <tr>
                    <td>{netIncomeData[0].businessSegmentNameEn}</td>
                    {netIncomeData[0].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{netIncomeData[1].businessSegmentNameEn}</td>
                    {netIncomeData[1].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{netIncomeData[2].businessSegmentNameEn}</td>
                    {netIncomeData[2].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{netIncomeData[3].businessSegmentNameEn}</td>
                    {netIncomeData[3].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{netIncomeData[4].businessSegmentNameEn}</td>
                    {netIncomeData[4].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>
                  <tr>
                    <td>{netIncomeData[5].businessSegmentNameEn}</td>
                    {netIncomeData[5].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{netIncomeData[6].businessSegmentNameEn}</td>
                    {netIncomeData[6].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{netIncomeData[7].businessSegmentNameEn}</td>
                    {netIncomeData[7].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr style={{ fontSize: "25px" }}>
                    <td>Total Assets</td>
                  </tr>
                  <tr>
                    <td>{totalAssetsData[0].businessSegmentNameEn}</td>
                    {totalAssetsData[0].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{totalAssetsData[1].businessSegmentNameEn}</td>
                    {totalAssetsData[1].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{totalAssetsData[2].businessSegmentNameEn}</td>
                    {totalAssetsData[2].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{totalAssetsData[3].businessSegmentNameEn}</td>
                    {totalAssetsData[3].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{totalAssetsData[4].businessSegmentNameEn}</td>
                    {totalAssetsData[4].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>
                  <tr>
                    <td>{totalAssetsData[5].businessSegmentNameEn}</td>
                    {totalAssetsData[5].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr style={{ fontSize: "25px" }}>
                    <td>Total Liabilities</td>
                  </tr>
                  <tr>
                    <td>{totalLiabilitiesData[0].businessSegmentNameEn}</td>
                    {totalLiabilitiesData[0].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{totalLiabilitiesData[1].businessSegmentNameEn}</td>
                    {totalLiabilitiesData[1].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{totalLiabilitiesData[2].businessSegmentNameEn}</td>
                    {totalLiabilitiesData[2].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{totalLiabilitiesData[3].businessSegmentNameEn}</td>
                    {totalLiabilitiesData[3].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{totalLiabilitiesData[4].businessSegmentNameEn}</td>
                    {totalLiabilitiesData[4].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>
                  <tr>
                    <td>{totalLiabilitiesData[5].businessSegmentNameEn}</td>
                    {totalLiabilitiesData[5].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr style={{ fontSize: "25px" }}>
                    <td>Sales </td>
                  </tr>
                  <tr>
                    <td>{salesData[0].businessSegmentNameEn}</td>
                    {salesData[0].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{salesData[1].businessSegmentNameEn}</td>
                    {salesData[1].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{salesData[2].businessSegmentNameEn}</td>
                    {salesData[2].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{salesData[3].businessSegmentNameEn}</td>
                    {salesData[3].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{salesData[4].businessSegmentNameEn}</td>
                    {salesData[4].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>
                  <tr>
                    <td>{salesData[5].businessSegmentNameEn}</td>
                    {salesData[5].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr style={{ fontSize: "25px" }}>
                    <td>Cost Of Sales </td>
                  </tr>
                  <tr>
                    <td>{costOfSalesData[0].businessSegmentNameEn}</td>
                    {costOfSalesData[0].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{costOfSalesData[1].businessSegmentNameEn}</td>
                    {costOfSalesData[1].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{costOfSalesData[2].businessSegmentNameEn}</td>
                    {costOfSalesData[2].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{costOfSalesData[3].businessSegmentNameEn}</td>
                    {costOfSalesData[3].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
                  </tr>

                  <tr>
                    <td>{costOfSalesData[4].businessSegmentNameEn}</td>
                    {costOfSalesData[4].periodicValues.map((v) => {
                      return <td>{v.value}</td>;
                    })}
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
}

export default Businesssegmentstabs;
