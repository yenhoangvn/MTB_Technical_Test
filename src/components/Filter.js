import React from "react";
import { MdExpandLess } from "react-icons/md";
import Select from "react-select";
import { BiFilterAlt } from "react-icons/bi";

const Filter = ({
  startUpsDB,
  industry,
  country,
  displayStartUp,
  maxLenght,
}) => {
  industry.forEach((ele) => {
    if (startUpsDB.length !== maxLenght) {
      ele.filter = 0;
      startUpsDB.forEach((element) => {
        if (
          element[1].Industry_Verticals__c !== null &&
          element[1].Industry_Verticals__c.includes(ele.label)
        ) {
          ele.filter++;
        }
      });
    } else {
      ele.filter = ele.quantity;
    }
  });
  country.forEach((ele) => {
    if (startUpsDB.length !== maxLenght) {
      ele.filter = 0;
      startUpsDB.forEach((element) => {
        if (element[1].HQ_Country__c === ele.label) {
          ele.filter++;
        }
      });
    } else {
      ele.filter = ele.quantity;
    }
  });

  const styles = {
    control: (base) => ({
      ...base,
      color: "black",
    }),
    menu: (base) => ({
      ...base,
      color: "black",
    }),
  };

  const formatOptionLabel = ({ value, label, quantity, filter }) => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>{label}</div>
      <div
        style={{
          marginLeft: "10px",
          color: "white",
          backgroundColor: "#087AFB",
          borderRadius: "5px",
          padding: "0 5px",
          fontSize: "0.9rem",
        }}
      >
        Showing {filter} of {quantity}
      </div>
    </div>
  );

  return (
    <>
      <div className="left_title">
        <p>Filters</p>
        <BiFilterAlt />
      </div>
      <div className="left_searchBar">
        <div className="left_searchBar_title">
          <label>Country</label>
          <MdExpandLess />
        </div>
        <Select
          defaultValue={country[1]}
          options={country}
          isMulti
          isSearchable
          placeholder="Search Country..."
          onChange={(opt) => displayStartUp(opt, "country")}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary: "orange",
              //   primary25: 'orange',
            },
          })}
          styles={styles}
          formatOptionLabel={formatOptionLabel}
        />
      </div>
      <div className="left_searchBar">
        <div className="left_searchBar_title">
          <label>Industry</label>
          <MdExpandLess />
        </div>
        <Select
          options={industry}
          isMulti
          onChange={(opt) => displayStartUp(opt, "industry")}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary: "orange",
            },
          })}
          styles={styles}
          formatOptionLabel={formatOptionLabel}
        />
      </div>
    </>
  );
};

export default Filter;
