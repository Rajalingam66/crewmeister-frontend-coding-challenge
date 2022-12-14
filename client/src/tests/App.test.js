import React, { screen, cleanup, fireEvent } from "@testing-library/react";
import App from "../app/App";
import { renderWithSagaAndStore } from "./utils/renderHelper";
import absenceSagas from "../redux/sagas";
import { httpService } from "../utils/httpService";
import { apiResponse } from "./mocks/getAbsenceData";
import { absenceReducer } from "../redux/reducer";

afterEach(cleanup);

jest.mock("../utils/httpService");
jest.mock("axios", () => ({
  get: jest.fn(),
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
  })),
}));

const httpServiceMock = (emptyRecords) => {
  httpService.get.mockImplementation((url) => {
    let response;
    if (emptyRecords) {
      response = {
        status: 200,
        data: [],
      };
    } else if (url.indexOf("/get-absence-details") !== -1 && !emptyRecords) {
      response = {
        status: 200,
        data: { ...apiResponse },
      };
    } else {
      response = {
        status: 500,
        data: {},
      };
    }
    return response;
  });
};

describe("App component Testing", () => {
  beforeEach(() => {
    httpServiceMock();
    renderWithSagaAndStore(
      <App />,
      { absence: absenceReducer },
      { sagas: absenceSagas }
    );
  });
  test("Component rendered without any issues", () => {
    const app = screen.getByTestId("app");
    expect(app).toBeInTheDocument();
    const header = screen.getByText(/Total Count/i);
    expect(header).toBeInTheDocument();
  });

  test("Check the column headers rendered", () => {
    const memberName = screen.getByText(/Member Name/i);
    expect(memberName).toBeInTheDocument();
    const type = screen.getByText(/Type/i);
    expect(type).toBeInTheDocument();
    const status = screen.getByText(/Status/i);
    expect(status).toBeInTheDocument();
    const startDate = screen.getByText(/Start Date/i);
    expect(startDate).toBeInTheDocument();
    const endDate = screen.getByText(/End Date/i);
    expect(endDate).toBeInTheDocument();
    const admitterNote = screen.getByText(/Admitter Note/i);
    expect(admitterNote).toBeInTheDocument();
    const memberNote = screen.getByText(/Member Note/i);
    expect(memberNote).toBeInTheDocument();
  });

  test("Test Member Name value displayed", async () => {
    const matched = screen.getAllByRole("cell")[0];
    expect(matched).toHaveTextContent(/Manuel/);
  });
  test("Test absence type is displayed", async () => {
    const matched = screen.getAllByRole("cell")[1];
    expect(matched).toHaveTextContent(/vacation/);
  });
  test("Test absence status is displayed", async () => {
    const matched = screen.getAllByRole("cell")[2];
    expect(matched).toHaveTextContent(/Requested/);
  });
  test("Test Start Date value displayed", async () => {
    const matched = screen.getAllByRole("cell")[3];
    expect(matched).toHaveTextContent("08/05/2021");
  });
  test("Test End Date value displayed", async () => {
    const matched = screen.getAllByRole("cell")[4];
    expect(matched).toHaveTextContent("08/12/2021");
  });
  test("Test Member Note value displayed", async () => {
    const matched = screen.getAllByRole("cell")[5];
    expect(matched).toHaveTextContent("Pfadfindersommerlager");
  });

  test("Test Pagination Click events", async () => {
    //clicking page number 2
    const inputNode = screen.getByLabelText("Page 3", { selector: "button" });
    expect(inputNode).toBeInTheDocument();
    await fireEvent.click(inputNode);
    const matched = screen.getAllByRole("cell")[6];
    expect(matched).toHaveTextContent("Schönes langes WE!");

    //clicking next page button
    const nextPage = screen.getByLabelText("Next Page", { selector: "button" });
    expect(nextPage).toBeInTheDocument();
    await fireEvent.click(nextPage);
    const memberName = screen.getAllByRole("cell")[0];
    expect(memberName).toHaveTextContent(/Max/);
    const admitterNote = screen.getAllByRole("cell")[6];
    expect(admitterNote).toHaveTextContent("Works nicely!");

    //clicking last page button
    const lastPage = screen.getByLabelText("Last Page", { selector: "button" });
    expect(lastPage).toBeInTheDocument();
    await fireEvent.click(lastPage);
    const lastPageMemberName = screen.getAllByRole("cell")[0];
    expect(lastPageMemberName).toHaveTextContent(/Mike/);
    const lastPageAdmitterNote = screen.getAllByRole("cell")[6];
    expect(lastPageAdmitterNote).toHaveTextContent("Sorry");
  });

  test("Test Vacation Type Filter ", async () => {
    const typeFilter = screen.getAllByLabelText("Filter", {
      selector: "button",
    })[0];
    expect(typeFilter).toBeInTheDocument();
    await fireEvent.click(typeFilter);
    const element = screen.getByTestId("typedropdown");
    await fireEvent.click(element);
    const vacationOption = screen.getByLabelText("vacation", {
      selector: "li",
    });
    await fireEvent.click(vacationOption);
    const apply = screen.getByLabelText("Apply", { selector: "button" });
    await fireEvent.click(apply);
    const matched = screen.getAllByRole("cell")[2];
    expect(matched).toHaveTextContent(/Requested/);
  });

  test("Test Sickness Type Filter ", async () => {
    const filter = screen.getAllByLabelText("Filter", {
      selector: "button",
    })[0];
    expect(filter).toBeInTheDocument();
    await fireEvent.click(filter);
    const dropdown = screen.getByTestId("typedropdown");
    await fireEvent.click(dropdown);
    const sickness = screen.getByLabelText("sickness", { selector: "li" });
    await fireEvent.click(sickness);
    const applySickness = screen.getByLabelText("Apply", {
      selector: "button",
    });
    await fireEvent.click(applySickness);
  });
  test("Test Status Filter ", async () => {
    const statusFilter = screen.getAllByLabelText("Filter", {
      selector: "button",
    })[1];
    expect(statusFilter).toBeInTheDocument();
    await fireEvent.click(statusFilter);
    const element = screen.getByTestId("statusdropdown");
    await fireEvent.click(element);
    const confirmedOption = screen.getByLabelText("Confirmed", {
      selector: "li",
    });
    await fireEvent.click(confirmedOption);
    const apply = screen.getByLabelText("Apply", { selector: "button" });
    await fireEvent.click(apply);
  });
  test("Test StartDate Filter ", async () => {
    const startDate = screen.getAllByLabelText("Filter", {
      selector: "button",
    })[2];
    expect(startDate).toBeInTheDocument();
    await fireEvent.click(startDate);
    const element = screen.getByPlaceholderText("mm/dd/yyyy");
    await fireEvent.click(element);
  });
});

describe("App component Testing without Records", () => {
  beforeEach(() => {
    httpServiceMock(true);
    renderWithSagaAndStore(
      <App />,
      { absence: absenceReducer },
      { sagas: absenceSagas }
    );
  });
  test("Component rendered without any issues", () => {
    const app = screen.getByTestId("app");
    expect(app).toBeInTheDocument();
  });

  test("Test No Records found", async () => {
    const matched = screen.getByText(/No records found./);
    expect(matched).toBeInTheDocument();
  });
});
