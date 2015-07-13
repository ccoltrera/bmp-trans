"use strict";

var fs = require("fs");
var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();

function checkBMP(data) {
  //Check to ensure file is Windows Bitmap
  if (data.toString("ascii",0,2) === "BM") {
    var imgDataOffset = data.readUInt32LE(10);
    //Check if BMP has a palette or not, and returns data necessary for transformations.
    if (imgDataOffset === 54) {
       return {
        start: 54,
        end: data.length,
        colorSpec: 3
       };
    }
    else {
      return {
        start: 54,
        end: imgDataOffset,
        colorSpec: 4
       };
    }
  }
  else {
    return false;
  }
}

function invert(data, start, end) {
  for (var i = start; i < end; i++) {
    data[i] = Math.abs(255 - data[i]);
  }
}

function grey(data, start, end, colorSpec) {
  for (var i = start; i < end; i += colorSpec) {
    var greyVal = (data[i] + data[i+1] + data[i+2])/3;
    data[i] = greyVal;
    data[i+1] = greyVal;
    data[i+2] = greyVal;
  }
}

function red(data, start, end, colorSpec) {
  for (var i = start; i < end; i += colorSpec) {
    if (data[i+2] * 2 <= 255) {
      data[i+2] = data[i] * 2;
    }
    else {
      data[i+2] = 255;
    }
  }
}

function green(data, start, end, colorSpec) {
  for (var i = start; i < end; i += colorSpec) {
    if (data[i+1] * 2 <= 255) {
      data[i+1] = data[i] * 2;
    }
    else {
      data[i+1] = 255;
    }
  }
}

function blue(data, start, end, colorSpec) {
  for (var i = start; i < end; i += colorSpec) {
    if (data[i] * 2 <= 255) {
      data[i] = data[i] * 2;
    }
    else {
      data[i] = 255;
    }
  }
}

var transformations = {
  invert: invert,
  grey: grey,
  green: green,
  red: red,
  blue: blue
};

function makeNewBMP(path, transformation) {
  var newPath = path.slice(0, path.length - 4) + "." + transformation + ".bmp";
  var bmpStream = fs.createWriteStream(newPath);
  return bmpStream;
}

function writeToFile(data, bmpStream) {
  bmpStream.write(data, function(){
  });
}

function transform(path, transformation) {
  fs.readFile(path, function(error, data) {
    if (!error) {
      var bmpInfo = checkBMP(data);
      if (bmpInfo) {
        transformations[transformation](data, bmpInfo.start, bmpInfo.end, bmpInfo.colorSpec);
        var bmpStream = makeNewBMP(path, transformation);
        writeToFile(data, bmpStream);
      } else {
        console.log("Incompatible File");
      }
    }
  });
}

module.exports.checkBMP = checkBMP;
module.exports.transform = transform;
