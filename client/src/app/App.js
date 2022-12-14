import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { absenceDetailsSelector } from "../redux/selectors";
import React, { useState, useEffect } from "react";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import Header from '../components/Header';
import { formatDate } from '../utils/helpers';
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const absenceData = useSelector(
    (state) => absenceDetailsSelector(state),
    shallowEqual
  );
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);
  const types = ["vacation", "sickness"];
  const statuses = ["Confirmed", "Requested", "Rejected"];
// console.log("absenceData",absenceData.absenceDetails);
  useEffect(() => {
    dispatch({ type: "GET_ABSENCE_DETAILS" });
    setLoading(false);
    initFilters();
  }, []);

  const initFilters = () => {
    setFilters({
      startDate: { value: null, matchMode: FilterMatchMode.DATE_IS },
      endDate: { value: null, matchMode: FilterMatchMode.DATE_IS },
      type: { value: null, matchMode: FilterMatchMode.EQUALS },
      status: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
  };

  const selectBodyTemplate = (rowData) => {
    return (
      <div data-testid="type">
        <span>{rowData.type}</span>
      </div>
    );
  };

  const selectStatusTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.status}</span>
      </React.Fragment>
    );
  };

  const selectFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={types}
        onChange={(e) => {
          console.log("Type Filter",e.value);
          options.filterCallback(e.value, options.index)}
        }
        itemTemplate={statusItemTemplate}
        className="p-column-filter"
        showClear
        data-testid="typedropdown"
      />
    );
  };

  const selectStatusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        className="p-column-filter"
        data-testid="statusdropdown"
        showClear
      />
    );
  };

  const startDateBodyTemplate = (rowData) => {
    return formatDate(rowData.startDate);
  };

  const endDateBodyTemplate = (rowData) => {
    return formatDate(rowData.endDate);
  };

  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => {
          options.filterCallback(e.value, options.index);
        }}
        onInput={(e) => {
          console.log("Calendar Input", e);
          options.filterCallback(e.value, options.index);
        }}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };

  const statusItemTemplate = (option) => {
    return <span>{option}</span>;
  };

  return (
    <div className="datatable-filter-demo" data-testid="app">
      <div className="card">
      
        <DataTable
          value={absenceData.absenceDetails}
          paginator
          className="p-datatable-customers"
          rows={10}
          dataKey="id"
          filters={filters}
          filterDisplay="menu"
          loading={loading}
          responsiveLayout="scroll"
          header={Header()}
          emptyMessage="No records found."
          data-testid="data-table"
        >
          <Column
            field="memberDetails.name"
            header="Member Name"
            style={{ minWidth: "12rem" }}
            id="memberName"
          />

          <Column
            header="Type"
            filterField="type"
            showFilterMatchModes={false}
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "14rem" }}
            body={selectBodyTemplate}
            filter
            filterElement={selectFilterTemplate}
          />
          
          <Column
            header="Status"
            filterField="status"
            showFilterMatchModes={false}
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "14rem" }}
            body={selectStatusTemplate}
            filter
            filterElement={selectStatusFilterTemplate}
          />

          <Column
            header="Start Date"
            filterField="startDate"
            dataType="date"
            style={{ minWidth: "10rem" }}
            body={startDateBodyTemplate}
            filter
            filterElement={dateFilterTemplate}
          />

          <Column
            header="End Date"
            filterField="endDate"
            dataType="date"
            style={{ minWidth: "10rem" }}
            body={endDateBodyTemplate}
            filter
            filterElement={dateFilterTemplate}
          />

          <Column
            field="memberNote"
            header="Member Note"
            style={{ minWidth: "12rem" }}
          />

          <Column
            field="admitterNote"
            header="Admitter Note"
            style={{ minWidth: "12rem" }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default App;
