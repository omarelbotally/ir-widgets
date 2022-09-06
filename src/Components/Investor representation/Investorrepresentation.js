import React, { useEffect, useState } from "react";
import "./Investorrepresentation.css";
import axios from "axios";

function Investorrepresentation() {
  const [reportsTable, setReportsTable] = useState([]);
  const [filteredTable, setFilteredTable] = useState([]);
  const [dateFrom, setDateFrom] = useState("10 / 13 / 2009");
  const [dateTo, setDateTo] = useState("09 / 04 / 2022");
  const [type, setType] = useState("Earnings Call");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://data.argaam.com/api/v1.0/json/ir-api/investors-presentation?reportTypeID=&dateFrom=&dateTo=`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setReportsTable(response.data.investorsPresentations);
        setFilteredTable(response.data.investorsPresentations);
      });

    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, []);

  let filter = () => {
    setTimeout(() => {
      setFilteredTable(
        reportsTable.filter((v) => {
          console.log(v.createdOn, v.typeNameEn);
          return (
            v.createdOn >= dateFrom &&
            v.createdOn <= dateTo &&
            v.typeNameEn == type
          );
        })
      );
    }, 1000);

    console.log(filteredTable);
  };

  if (!loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="investor-representation container ">
        <div className="investors-presentation-data-header ">
          <form className="htd__form row">
            <div className="type d-flex flex-row col-md-6 col-12 col-sm-12">
              <p className="my-auto">Type</p>
              <div className="select-dropdown">
                <select
                  onChange={(e) => {
                    setType(e.target.value);
                    filter();
                  }}
                >
                  <option value="Earnings Call">Earnings Call</option>
                  <option value="Annual Report">Annual Report </option>
                  <option value="Corporate Guides">Corporate Guides</option>
                  <option value="Minutes of general meeting">
                    Minutes Of General
                  </option>
                  <option value="Articles of association">
                    Articles Of general{" "}
                  </option>
                  <option value="Others"> Others</option>
                  <option value="Real Estate Valuation Report">
                    {" "}
                    Real Estate Valuation Report
                  </option>
                  <option value="Investor Presentations">
                    Investor Presentations{" "}
                  </option>
                  <option value="Earnings Call Script">
                    {" "}
                    Earnings Call Script
                  </option>
                </select>
              </div>
            </div>

            <div className="date d-flex flex-row col-md-6 col-12 col-sm-12">
              <p className="my-auto">Date-From</p>

              <input
                type="date"
                onChange={(e) => {
                  setDateFrom(e.target.value);
                  filter();
                }}
              />

              <p className="my-auto">Date-To</p>

              <input
                type="date"
                onChange={(e) => {
                  setDateTo(e.target.value);
                  filter();
                }}
              />
            </div>
          </form>
        </div>

        <div className="reports-table w-100 ">
          <table className="w-100">
            <tbody>
              <tr>
                <td
                  style={{
                    position: "sticky",
                    left: "0",
                    zIndex: "1000",
                    backgroundColor: "white ",
                  }}
                >
                  Date
                </td>
                <td>Report</td>
                <td>Report Type</td>
                <td>Downloads</td>
              </tr>

              {filteredTable.map((report, index) => {
                const d = new Date(report.createdOn);

                return (
                  <tr key={index}>
                    <td
                      style={{
                        position: "sticky",
                        left: "0",
                        zIndex: "1000",
                        backgroundColor: "white ",
                      }}
                    >{`${d.getDate()}/${
                      d.getMonth() + 1
                    }/${d.getFullYear()}`}</td>
                    <td>{report.descriptionEn}</td>
                    <td>{report.typeNameEn}</td>
                    <td className="d-flex flex-row justify-content-start">
                      <div>
                        <a href={report.attachLinkUrlEn}>
                          <img src={require("../../assets/En-pdf.png")} />
                        </a>
                      </div>

                      <div>
                        <a href={report.attachLinkUrlAr}>
                          <img src={require("../../assets/Ar-pdf.png")} />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Investorrepresentation;
