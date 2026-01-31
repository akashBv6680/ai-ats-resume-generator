import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ResumeForm from "../../../frontend/src/components/ResumeBuilder/ResumeForm";

jest.mock("../../../frontend/src/services/resume", () => ({
  createResume: jest.fn().mockResolvedValue({ id: "123", atsScore: 85 })
}));

test("renders ResumeForm and submits basic data", async () => {
  render(<ResumeForm />);

  fireEvent.change(screen.getByPlaceholderText(/Data Scientist/i), {
    target: { value: "Data Scientist" }
  });
  fireEvent.change(screen.getByPlaceholderText(/Junior, Mid-level, Senior/i), {
    target: { value: "Junior" }
  });

  const button = screen.getByRole("button", { name: /Generate & Save Resume/i });
  fireEvent.click(button);

  expect(button).toBeDisabled();
});
