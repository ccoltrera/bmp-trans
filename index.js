"use strict";

var bmpTrans = require("./lib/bmp-trans");

bmpTrans.transform("./bmps/non-palette-bitmap.bmp", "red");
bmpTrans.transform("./bmps/palette-bitmap.bmp", "red");

bmpTrans.transform("./bmps/non-palette-bitmap.bmp", "green");
bmpTrans.transform("./bmps/palette-bitmap.bmp", "green");

bmpTrans.transform("./bmps/non-palette-bitmap.bmp", "blue");
bmpTrans.transform("./bmps/palette-bitmap.bmp", "blue");

bmpTrans.transform("./bmps/non-palette-bitmap.bmp", "invert");
bmpTrans.transform("./bmps/palette-bitmap.bmp", "invert");
