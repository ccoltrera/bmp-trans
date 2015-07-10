"use strict";

var expect = require("chai").expect;
var bmpTrans = require("../lib/bmp-trans");

describe("fileReader", function() {
  it("should read a file, specified by path, and return a Buffer() object", function() {
    var buf = bmpTrans.fileReader("../bmps/non-palette-bitmap.bmp");
    expect(typeof buf).to.eql("object");
    expect(buf).to.be.an.instanceof(Buffer);
  });
});
