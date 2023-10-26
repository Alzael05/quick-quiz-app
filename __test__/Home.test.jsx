import { render, screen } from "@testing-library/react";
// import userEvent from '@testing-library/user-event'

import Home from "../src/app/page";

const mockChildComponent = jest.fn();
jest.mock("../src/app/components/Logo", () => (props) => {
  mockChildComponent(props);
});

describe("Home", () => {
  it("should have Let's Start text", async () => {
    // ARRANGE
    render(<Home />);

    // ACT
    const element = screen.getByText("Let's Start");

    // ASSERT
    expect(element).toBeInTheDocument();
  });

  it("should have rendered Logo", async () => {
    // ARRANGE
    render(<Home />);

    // ACT
    // const element = screen.get;

    // ASSERT
    expect(mockChildComponent).toHaveBeenCalled()
  });
});
