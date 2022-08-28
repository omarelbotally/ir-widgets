import React, { useEffect, useState } from "react";
import "./business-segments-tabs.css";
import axios from "axios";
import Api from "../../Api/Api";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function Businesssegmentstabs() {
  const [salesData, setSalesData] = useState([]);
  const [costOfSalesData, setCostOfSalesData] = useState([]);
  const [netIncomeData, setNetIncomeData] = useState([]);
  const [totalAssetsData, setTotalAssetsData] = useState([]);
  const [totalLiabilitiesData, setTotalLiabilitiesData] = useState([]);
  const [salesGeo, setSalesGeo] = useState([]);
  const [netIncomeGeo, setNetIncomeGeo] = useState([]);
  const [costOfSalesGeo, setCostOfSalesGeo] = useState([]);
  const [currency, setCurrency] = useState("Riyal");
  const [fiscalPeriodType, setFiscalPeriodType] = useState("year");
  const [loading, setLoading] = useState(false);

  let dollarUSLocale = Intl.NumberFormat("en-US");
  let td = document.querySelectorAll(".td-data");

  let checkPositivity = () => {
    td.forEach((ele) => {
      if (ele.innerHTML >= 0) {
        ele.classList.add("green-color");
      } else if (ele.innerHTML < 0) {
        ele.innerHTML = `(${Math.abs(ele.innerHTML)})`;
        ele.classList.add("red-color");
      }
    });
  };

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
          checkPositivity();
        }, 1000);
      });

    axios
      .get(
        `https://data.argaam.com/api/v1.0/json/ir-api/geolocation-segments?fiscalPeriodType=${fiscalPeriodType}&currency=${currency}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        setSalesGeo(resp.data.fsFields[0]);
        setCostOfSalesGeo(resp.data.fsFields[1]);
        setNetIncomeGeo(resp.data.fsFields[2]);
      });
  }, [fiscalPeriodType, currency]);

  useEffect(() => {}, []);

  if (!loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="business-segments container">
        <div className="outline-tabs">
          <Tabs>
            <TabList>
              <Tab>
                <h5 className=".active-tab">BUSINESS</h5>
              </Tab>
              <Tab>
                <h5 className="active">GEO SEGMENTS</h5>
              </Tab>
            </TabList>

            <TabPanel>
              <table className="w-100">
                <tr className="td-data">
                  <td className="avenir-sm">Egypt </td>
                </tr>

                <tr className="td-data">
                  <td className="avenir-sm ">Other Countries</td>
                </tr>

                <tr className="td-data">
                  <td className="avenir-sm ">Saudi Arabia </td>
                </tr>

                <tr className="td-data">
                  <td className="avenir-sm ">Iran </td>
                </tr>
              </table>

              <div className="header-of-tabs">
                <div className="tabs-container">
                  <span className="tabs">
                    {" "}
                    <a
                      className="btn btn-light active"
                      id="annual"
                      onClick={() => {
                        setFiscalPeriodType("year");
                        document
                          .getElementById("annual")
                          .classList.add("active");
                        document
                          .getElementById("quarter")
                          .classList.remove("active");
                        document
                          .getElementById("interim")
                          .classList.remove("active");
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
                        document
                          .getElementById("annual")
                          .classList.remove("active");
                        document
                          .getElementById("quarter")
                          .classList.add("active");
                        document
                          .getElementById("interim")
                          .classList.remove("active");
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
                        document
                          .getElementById("annual")
                          .classList.remove("active");
                        document
                          .getElementById("quarter")
                          .classList.remove("active");
                        document
                          .getElementById("interim")
                          .classList.add("active");
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
                        className="btn btn-light active"
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
                          document
                            .getElementById("usd-btn")
                            .classList.add("active");
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
                        <tr
                          style={{
                            backgroundColor: "white",
                            padding: "20px",
                            height: "50px",
                          }}
                        >
                          <td>
                            <BsFillArrowLeftCircleFill />
                          </td>

                          <td className="text-lg-start">
                            {salesData[0].periodicValues[0].forDate}
                          </td>

                          <td className="text-lg-start">
                            {salesData[0].periodicValues[1].forDate}
                          </td>

                          <td className="text-lg-start">
                            {salesData[0].periodicValues[2].forDate}
                          </td>

                          <td className="text-lg-start">
                            {" "}
                            {salesData[0].periodicValues[3].forDate}
                          </td>

                          <td className="text-lg-start">
                            {salesData[0].periodicValues[4].forDate}
                          </td>

                          <td className="text-lg-start">
                            {salesData[0].periodicValues[5].forDate}
                          </td>

                          <td>
                            <BsFillArrowRightCircleFill />
                          </td>
                        </tr>

                        <tr>
                          <td>Details</td>
                          <td>Million RIYAL</td>
                          <td>Million RIYAL</td>
                          <td>Million RIYAL</td>
                          <td>Million RIYAL</td>
                          <td>Million RIYAL</td>
                          <td>Million RIYAL</td>
                        </tr>

                        <tr>
                          <td className="headlines">- net Income</td>
                        </tr>
                        <tr>
                          <td className="td-data">
                            {netIncomeData[0].businessSegmentNameEn}
                          </td>
                          {netIncomeData[0].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {netIncomeData[1].businessSegmentNameEn}
                          </td>
                          {netIncomeData[1].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {netIncomeData[2].businessSegmentNameEn}
                          </td>
                          {netIncomeData[2].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {netIncomeData[3].businessSegmentNameEn}
                          </td>
                          {netIncomeData[3].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {netIncomeData[4].businessSegmentNameEn}
                          </td>
                          {netIncomeData[4].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="td-data">
                            {netIncomeData[5].businessSegmentNameEn}
                          </td>
                          {netIncomeData[5].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {netIncomeData[6].businessSegmentNameEn}
                          </td>
                          {netIncomeData[6].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {netIncomeData[7].businessSegmentNameEn}
                          </td>
                          {netIncomeData[7].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="headlines">- Total Assets</td>
                        </tr>
                        <tr>
                          <td className="td-data">
                            {totalAssetsData[0].businessSegmentNameEn}
                          </td>
                          {totalAssetsData[0].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {totalAssetsData[1].businessSegmentNameEn}
                          </td>
                          {totalAssetsData[1].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {totalAssetsData[2].businessSegmentNameEn}
                          </td>
                          {totalAssetsData[2].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {totalAssetsData[3].businessSegmentNameEn}
                          </td>
                          {totalAssetsData[3].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {totalAssetsData[4].businessSegmentNameEn}
                          </td>
                          {totalAssetsData[4].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>
                        {/* <tr>
                    <td>{totalAssetsData[5].businessSegmentNameEn}</td>
                    {totalAssetsData[5].periodicValues.map((v) => {
                      return (
                        <td className="td-data">
                          {" "}
                          {Number.parseFloat(
                            dollarUSLocale.format(v.value)
                          ).toFixed(2)}
                        </td>
                      );
                    })}
                  </tr> */}

                        <tr>
                          <td className="headlines">- Total Liabilities</td>
                        </tr>
                        <tr>
                          <td className="td-data">
                            {totalLiabilitiesData[0].businessSegmentNameEn}
                          </td>
                          {totalLiabilitiesData[0].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {totalLiabilitiesData[1].businessSegmentNameEn}
                          </td>
                          {totalLiabilitiesData[1].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr className="td-data">
                          <td>
                            {totalLiabilitiesData[2].businessSegmentNameEn}
                          </td>
                          {totalLiabilitiesData[2].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {totalLiabilitiesData[3].businessSegmentNameEn}
                          </td>
                          {totalLiabilitiesData[3].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {totalLiabilitiesData[4].businessSegmentNameEn}
                          </td>
                          {totalLiabilitiesData[4].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="td-data">
                            {totalLiabilitiesData[5].businessSegmentNameEn}
                          </td>
                          {totalLiabilitiesData[5].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="headlines">- Sales </td>
                        </tr>
                        <tr>
                          <td className="td-data">
                            {salesData[0].businessSegmentNameEn}
                          </td>
                          {salesData[0].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {salesData[1].businessSegmentNameEn}
                          </td>
                          {salesData[1].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {salesData[2].businessSegmentNameEn}
                          </td>
                          {salesData[2].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {salesData[3].businessSegmentNameEn}
                          </td>
                          {salesData[3].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {salesData[4].businessSegmentNameEn}
                          </td>
                          {salesData[4].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="td-data">
                            {salesData[5].businessSegmentNameEn}
                          </td>
                          {salesData[5].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="headlines">- Cost Of Sales </td>
                        </tr>
                        <tr>
                          <td className="td-data">
                            {costOfSalesData[0].businessSegmentNameEn}
                          </td>
                          {costOfSalesData[0].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {costOfSalesData[1].businessSegmentNameEn}
                          </td>
                          {costOfSalesData[1].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {costOfSalesData[2].businessSegmentNameEn}
                          </td>
                          {costOfSalesData[2].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {costOfSalesData[3].businessSegmentNameEn}
                          </td>
                          {costOfSalesData[3].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>

                        <tr>
                          <td className="td-data">
                            {costOfSalesData[4].businessSegmentNameEn}
                          </td>
                          {costOfSalesData[4].periodicValues.map((v) => {
                            return (
                              <td className="td-data">
                                {" "}
                                {Number.parseFloat(
                                  dollarUSLocale.format(v.value)
                                ).toFixed(2)}
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <table className="w-100">
                <tr className="td-data">
                  <td className="avenir-sm">Retail Sector</td>
                  <td className="avenir-sm" style={{ color: "black" }}>
                    Includes supermarket and hypermarket compounds
                  </td>
                </tr>

                <tr className="td-data">
                  <td className="avenir-sm">Food sector</td>
                  <td className="avenir-sm" style={{ color: "black" }}>
                    Includes the manufacture and sale of edible oils, sugar,
                    pasta products
                  </td>
                </tr>

                <tr className="td-data">
                  <td className="avenir-sm">Plastic</td>
                  <td className="avenir-sm" style={{ color: "black" }}></td>
                </tr>

                <tr className="td-data">
                  <td className="avenir-sm">Investments and treasury</td>
                  <td className="avenir-sm" style={{ color: "black" }}>
                    Includes investments in associates and Joint ventures
                    companies, available for sale investments and other
                    investments
                  </td>
                </tr>

                <tr className="td-data">
                  <td className="avenir-sm">Disposals</td>
                  <td className="avenir-sm" style={{ color: "black" }}></td>
                </tr>

                <tr className="td-data">
                  <td className="avenir-sm">
                    Manufacturing & Whole sale sector
                  </td>
                  <td className="avenir-sm" style={{ color: "black" }}></td>
                </tr>

                <tr className="td-data">
                  <td className="avenir-sm"> Food services</td>
                  <td className="avenir-sm" style={{ color: "black" }}>
                    Includes food products and fast food restaurant chain
                    operated by Herfy
                  </td>
                </tr>

                <tr className="td-data">
                  <td className="avenir-sm">Frozen food</td>
                  <td className="avenir-sm" style={{ color: "black" }}></td>
                </tr>

                <tr className="td-data">
                  <td className="avenir-sm">Dicontinued operation</td>
                  <td className="avenir-sm" style={{ color: "black" }}></td>
                </tr>
              </table>

              <div className="header-of-tabs">
                <div className="tabs-container">
                  <span className="tabs">
                    {" "}
                    <a
                      className="btn btn-light active"
                      id="annual"
                      onClick={() => {
                        setFiscalPeriodType("year");
                        document
                          .getElementById("annual")
                          .classList.add("active");
                        document
                          .getElementById("quarter")
                          .classList.remove("active");
                        document
                          .getElementById("interim")
                          .classList.remove("active");
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
                        document
                          .getElementById("annual")
                          .classList.remove("active");
                        document
                          .getElementById("quarter")
                          .classList.add("active");
                        document
                          .getElementById("interim")
                          .classList.remove("active");
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
                        document
                          .getElementById("annual")
                          .classList.remove("active");
                        document
                          .getElementById("quarter")
                          .classList.remove("active");
                        document
                          .getElementById("interim")
                          .classList.add("active");
                      }}
                    >
                      INTERIM
                    </a>
                  </span>
                </div>

                <div className="currency">
                  <span>Currency : </span>

                  <span>
                    <a
                      className="btn btn-light active"
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
                        document
                          .getElementById("usd-btn")
                          .classList.add("active");
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

                <table className="center" style={{ width: "100%" }}>
                  <tbody>
                    <tr
                      style={{
                        backgroundColor: "white",
                        padding: "20px",
                        height: "50px",
                      }}
                    >
                      <td>
                        <BsFillArrowLeftCircleFill />
                      </td>

                      <td className="text-lg-start">
                        {salesData[0].periodicValues[0].forDate}
                      </td>

                      <td className="text-lg-start">
                        {salesData[0].periodicValues[1].forDate}
                      </td>

                      <td className="text-lg-start">
                        {salesData[0].periodicValues[2].forDate}
                      </td>

                      <td className="text-lg-start">
                        {" "}
                        {salesData[0].periodicValues[3].forDate}
                      </td>

                      <td className="text-lg-start">
                        {salesData[0].periodicValues[4].forDate}
                      </td>

                      <td className="text-lg-start">
                        {salesData[0].periodicValues[5].forDate}
                      </td>

                      <td>
                        <BsFillArrowRightCircleFill />
                      </td>
                    </tr>

                    <tr>
                      <td>Details</td>
                      <td>Million RIYAL</td>
                      <td>Million RIYAL</td>
                      <td>Million RIYAL</td>
                      <td>Million RIYAL</td>
                      <td>Million RIYAL</td>
                      <td>Million RIYAL</td>
                    </tr>

                    <tr>
                      <td className="headlines">- {salesGeo.fsFieldNameEn}</td>
                    </tr>

                    <tr>
                      {salesGeo.geoLocationSegments.map((v) => {
                        return (
                          <tr>
                            <td>{v.geoLocationSegmentNameEn}</td>
                          </tr>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Businesssegmentstabs;
