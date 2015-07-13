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
    it("should return an object. If no palette data, return .start as 54, .end as the length of the data, and .colorSpec as 3", function(done) {
      fs.readFile("./bmps/non-palette-bitmap.bmp", function(error, data) {
          expect(bmpTrans.checkBMP(data)).to.deep.equal({
          start: 54,
          end: 30054,
          colorSpec: 2
        });
        done();
      });
    });
    it("should return an object. If palette data, return .start as 54, .end as img data offset, and .colorSpec as 4", function(done) {
      fs.readFile("./bmps/palette-bitmap.bmp", function(error, data) {
        expect(bmpTrans.checkBMP(data)).to.deep.equal({
          start: 54,
          end: 1078,
          colorSpec: 4
        });
        done();
      });
    });
  });
  describe("invert", function() {
    var buffer;
    beforeEach(function(done) {
      buffer = new Buffer("000000743f3f000000743f3f743f3f000000743f3f", "hex");
      done();
    });
    it("should take a Buffer of hex values and, starting and ending at given points, convert them to their color inverse", function() {
      bmpTrans.invert(buffer, 0, 30);
      expect(buffer).to.deep.equal(new Buffer("ffffff8bc0c0ffffff8bc0c08bc0c0ffffff8bc0c0", "hex"))
    });
  })
});
