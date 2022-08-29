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
      if (Number(ele.innerHTML) >= 0) {
        ele.classList.add("green-color");
      } else if (Number(ele.innerHTML) < 0) {
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
        setSalesData(response.data.fsFields[0]);
        setCostOfSalesData(response.data.fsFields[1]);
        setNetIncomeData(response.data.fsFields[2]);
        setTotalAssetsData(response.data.fsFields[3]);
        setTotalLiabilitiesData(response.data.fsFields[4]);
        console.log(response.data);
        setTimeout(() => {
          setLoading(true);
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

    checkPositivity();
  }, [fiscalPeriodType, currency]);

  if (!loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="business-segments container">
        <div className="outline-tabs">
          <Tabs>
            <TabList>
              <Tab>
                <h5 className="">BUSINESS</h5>
              </Tab>
              <Tab>
                <h5 className="">GEO SEGMENTS</h5>
              </Tab>
            </TabList>

            <TabPanel>
              <table className="w-100">
                <tr className="">
                  <td className="avenir-sm">Egypt </td>
                </tr>

                <tr className="">
                  <td className="avenir-sm ">Other Countries</td>
                </tr>

                <tr className="">
                  <td className="avenir-sm ">Saudi Arabia </td>
                </tr>

                <tr className="">
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
                            height: "80px",
                          }}
                        >
                          <td>
                            <BsFillArrowLeftCircleFill />
                          </td>

                          {salesData.businessSegments[0].periodicValues.map(
                            (s) => {
                              return <td>{s.forDate}</td>;
                            }
                          )}

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

                        <tr className="headlines">
                          - {salesData.fsFieldNameEn}
                        </tr>

                        {salesData.businessSegments.map((v) => {
                          return (
                            <tr>
                              <td>{v.businessSegmentNameEn}</td>

                              {v.periodicValues.map((t) => {
                                return (
                                  <td className="td-data">
                                    {t.value == null
                                      ? "0.00"
                                      : dollarUSLocale.format(
                                          Number.parseFloat(t.value).toFixed(2)
                                        )}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}

                        <tr className="headlines">
                          - {costOfSalesData.fsFieldNameEn}
                        </tr>

                        {costOfSalesData.businessSegments.map((v) => {
                          return (
                            <tr>
                              <td>{v.businessSegmentNameEn}</td>

                              {v.periodicValues.map((t) => {
                                return (
                                  <td className="td-data">
                                    {t.value == null
                                      ? "0.00"
                                      : dollarUSLocale.format(
                                          Number.parseFloat(t.value).toFixed(2)
                                        )}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}

                        <tr className="headlines">
                          - {netIncomeData.fsFieldNameEn}
                        </tr>

                        {netIncomeData.businessSegments.map((v) => {
                          return (
                            <tr>
                              <td>{v.businessSegmentNameEn}</td>

                              {v.periodicValues.map((t) => {
                                return (
                                  <td className="td-data">
                                    {t.value == null
                                      ? "0.00"
                                      : dollarUSLocale.format(
                                          Number.parseFloat(t.value).toFixed(2)
                                        )}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}

                        <tr className="headlines">
                          - {totalAssetsData.fsFieldNameEn}
                        </tr>

                        {totalAssetsData.businessSegments.map((v) => {
                          return (
                            <tr>
                              <td>{v.businessSegmentNameEn}</td>

                              {v.periodicValues.map((t) => {
                                return (
                                  <td className="td-data">
                                    {t.value == null
                                      ? "0.00"
                                      : dollarUSLocale.format(
                                          Number.parseFloat(t.value).toFixed(2)
                                        )}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}

                        <tr className="headlines">
                          - {totalLiabilitiesData.fsFieldNameEn}
                        </tr>

                        {totalLiabilitiesData.businessSegments.map((v) => {
                          return (
                            <tr>
                              <td>{v.businessSegmentNameEn}</td>

                              {v.periodicValues.map((t) => {
                                return (
                                  <td className="td-data">
                                    {t.value == null
                                      ? "0.00"
                                      : dollarUSLocale.format(
                                          Number.parseFloat(t.value).toFixed(2)
                                        )}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
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
                      {salesGeo.geoLocationSegments[0].periodicValues.map(
                        (v) => {
                          return <td>{v.forDate}</td>;
                        }
                      )}

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

                    {salesGeo.geoLocationSegments.map((v) => {
                      return (
                        <tr>
                          <td>{v.geoLocationSegmentNameEn}</td>

                          {v.periodicValues.map((t) => {
                            return (
                              <td className="td-data">
                                {t.value == null
                                  ? "0.00"
                                  : dollarUSLocale.format(
                                      Number.parseFloat(t.value).toFixed(2)
                                    )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}

                    <tr>
                      <td className="headlines">
                        - {costOfSalesGeo.fsFieldNameEn}
                      </td>
                    </tr>

                    {costOfSalesGeo.geoLocationSegments.map((v) => {
                      return (
                        <tr>
                          <td>{v.geoLocationSegmentNameEn}</td>

                          {v.periodicValues.map((t) => {
                            return (
                              <td className="td-data">
                                {t.value == null
                                  ? "0.00"
                                  : dollarUSLocale.format(
                                      Number.parseFloat(t.value).toFixed(2)
                                    )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}

                    <tr>
                      <td className="headlines">
                        - {netIncomeGeo.fsFieldNameEn}
                      </td>
                    </tr>

                    {netIncomeGeo.geoLocationSegments.map((v) => {
                      return (
                        <tr>
                          <td>{v.geoLocationSegmentNameEn}</td>

                          {v.periodicValues.map((t) => {
                            return (
                              <td className="td-data">
                                {t.value == null
                                  ? "0.00"
                                  : dollarUSLocale.format(
                                      Number.parseFloat(t.value).toFixed(2)
                                    )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
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
