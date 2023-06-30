const assert = require("chai").assert;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

// Read the index.html file
const indexHTML = fs.readFileSync("index.html", "utf-8");

describe("index.html", function () {
  let dom;

  before(function () {
    // Create a DOM using JSDOM
    dom = new JSDOM(indexHTML, { runScripts: "dangerously" });

    // Wait for the scripts to load
    return new Promise((resolve) => {
      dom.window.addEventListener("load", resolve);
    });
  });

  it("should have the correct banner icon count", function () {
    const bannerIcons = dom.window.document.querySelectorAll(".banner-icon");
    assert.strictEqual(bannerIcons.length, 4);
  });

  it("should have the correct title", function () {
    const title = dom.window.document.querySelector("title").textContent;
    assert.strictEqual(title, "GrowlerzSeattle.com is down for maintenance!");
  });

  it("should contain the banner title", function () {
    const bannerTitle =
      dom.window.document.querySelector("#banner-title").textContent;
    assert.strictEqual(bannerTitle, "Opps! Paws for a moment");
  });

  it("should have the correct footer disclaimer", function () {
    const footerDisclaimer =
      dom.window.document.querySelector("#disclaimer").textContent;
    assert.strictEqual(
      footerDisclaimer,
      "© 2023 GrowlerzSeattle.com - All Rights Reserved"
    );
  });
});
