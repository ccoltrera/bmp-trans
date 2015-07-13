"use strict";

var expect = require("chai").expect;
var bmpTrans = require("../lib/bmp-trans");
var fs = require("fs");

describe("bmpTrans", function() {
  describe("checkBMP", function() {
    it("should analyze a buffer, return null if that file not a Windows Bitmap file", function() {
      fs.readFile("./bmps/empty-file.bmp", function(error, data) {
        expect(bmpTrans.checkBMP(data)).to.deep.equal(null);
      });
    });
    it("should return an object. If no palette data, return .start as 54, .end as the length of the data, and .colorSpec as 3", function() {
      fs.readFile("./bmps/non-palette-bitmap.bmp", function(error, data) {
        expect(bmpTrans.checkBMP(data)).to.deep.equal({
        start: 54,
        end: 30054,
        colorSpec: 3
       });
      });
    });
    it("should return an object. If palette data, return .start as 54, .end as img data offset, and .colorSpec as 4", function() {
      fs.readFile("./bmps/palette-bitmap.bmp", function(error, data) {
        expect(bmpTrans.checkBMP(data)).to.deep.equal({
        start: 54,
        end: 1078,
        colorSpec: 4
       });
      });
    });
  });
});

{};
