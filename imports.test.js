import { expect, it } from "vitest";

import { name as shallowName } from "some-random-3rd-party-library";
import { name as deepName } from "some-other-library";

it("should resolve shallow deps correctly", () => {
  expect(shallowName).toEqual("browser.mjs");
});

it("should resolve deep deps correctly", () => {
  expect(deepName).toEqual("browser.mjs");
});
