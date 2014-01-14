(function() {
  var b, baseIndex, cachedNetlogoColors, color, colorArrayToCSS, colorTimesTen, g, i, netlogoBaseColors, netlogoColorNamesIndices, r, step, _i, _len, _ref;

  window.netlogoColorToCSS = function(netlogoColor) {
    var a, array, b, g, r, _ref;
    _ref = array = netlogoColorToRGB(netlogoColor), r = _ref[0], g = _ref[1], b = _ref[2];
    a = array.length > 3 ? array[3] : 255;
    if (a < 255) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + (a / 255) + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  };

  window.netlogoColorToRGB = function(netlogoColor) {
    switch (typeof netlogoColor) {
      case "number":
        return cachedNetlogoColors[Math.floor(netlogoColor * 10)];
      case "object":
        return netlogoColor.map(Math.round);
      case "string":
        return netlogoBaseColors[netlogoColorNamesIndices[netlogoColor]];
      default:
        return console.error("Unrecognized color: " + netlogoColor);
    }
  };

  netlogoColorNamesIndices = {};

  _ref = ['gray', 'red', 'orange', 'brown', 'yellow', 'green', 'lime', 'turqoise', 'cyan', 'sky', 'blue', 'violet', 'magenta', 'pink', 'black', 'white'];
  for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
    color = _ref[i];
    netlogoColorNamesIndices[color] = i;
  }

  netlogoBaseColors = [[140, 140, 140], [215, 48, 39], [241, 105, 19], [156, 109, 70], [237, 237, 47], [87, 176, 58], [42, 209, 57], [27, 158, 119], [82, 196, 196], [43, 140, 190], [50, 92, 168], [123, 78, 163], [166, 25, 105], [224, 126, 149], [0, 0, 0], [255, 255, 255]];

  cachedNetlogoColors = (function() {
    var _j, _ref1, _results;
    _results = [];
    for (colorTimesTen = _j = 0; _j <= 1400; colorTimesTen = ++_j) {
      baseIndex = Math.floor(colorTimesTen / 100);
      _ref1 = netlogoBaseColors[baseIndex], r = _ref1[0], g = _ref1[1], b = _ref1[2];
      step = (colorTimesTen % 100 - 50) / 50.48 + 0.012;
      if (step < 0) {
        r += Math.floor(r * step);
        g += Math.floor(g * step);
        b += Math.floor(b * step);
      } else {
        r += Math.floor((0xFF - r) * step);
        g += Math.floor((0xFF - g) * step);
        b += Math.floor((0xFF - b) * step);
      }
      _results.push([r, g, b]);
    }
    return _results;
  })();

  colorArrayToCSS = function(array) {
    var a, _ref1;
    _ref1 = array.map(Math.round), r = _ref1[0], g = _ref1[1], b = _ref1[2];
    a = array.length > 3 ? array[3] : 255;
    if (a < 255) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + (a / 255) + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  };

}).call(this);
(function() {
  var drawPath, setColoring,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.ShapeDrawer = (function() {

    function ShapeDrawer(shapes) {
      this.shapes = shapes;
    }

    ShapeDrawer.prototype.drawShape = function(ctx, turtleColor, shapeName) {
      ctx.translate(.5, -.5);
      ctx.scale(-1 / 300, 1 / 300);
      this.drawRawShape(ctx, turtleColor, shapeName);
    };

    ShapeDrawer.prototype.drawRawShape = function(ctx, turtleColor, shapeName) {
      var elem, shape, _i, _len, _ref;
      shape = this.shapes[shapeName] || defaultShape;
      _ref = shape.elements;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        draw[elem.type](ctx, turtleColor, elem);
      }
    };

    return ShapeDrawer;

  })();

  window.CachingShapeDrawer = (function(_super) {

    __extends(CachingShapeDrawer, _super);

    function CachingShapeDrawer(shapes) {
      CachingShapeDrawer.__super__.constructor.call(this, shapes);
      this.shapeCache = {};
    }

    CachingShapeDrawer.prototype.drawShape = function(ctx, turtleColor, shapeName) {
      var shapeCanvas, shapeCtx, shapeKey;
      shapeName = shapeName.toLowerCase();
      shapeKey = this.shapeKey(shapeName, turtleColor);
      shapeCanvas = this.shapeCache[shapeKey];
      if (!(shapeCanvas != null)) {
        shapeCanvas = document.createElement('canvas');
        shapeCanvas.width = shapeCanvas.height = 300;
        shapeCtx = shapeCanvas.getContext('2d');
        this.drawRawShape(shapeCtx, turtleColor, shapeName);
        this.shapeCache[shapeKey] = shapeCanvas;
      }
      ctx.translate(.5, -.5);
      ctx.scale(-1 / 300, 1 / 300);
      ctx.drawImage(shapeCanvas, 0, 0);
    };

    CachingShapeDrawer.prototype.shapeKey = function(shapeName, turtleColor) {
      return [shapeName, netlogoColorToCSS(turtleColor)];
    };

    return CachingShapeDrawer;

  })(ShapeDrawer);

  setColoring = function(ctx, turtleColor, element) {
    turtleColor = netlogoColorToCSS(turtleColor);
    if (element.filled) {
      if (element.marked) {
        ctx.fillStyle = turtleColor;
      } else {
        ctx.fillStyle = element.color;
      }
    } else {
      if (element.marked) {
        ctx.strokeStyle = turtleColor;
      } else {
        ctx.strokeStyle = element.color;
      }
    }
  };

  drawPath = function(ctx, turtleColor, element) {
    setColoring(ctx, turtleColor, element);
    if (element.filled) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  };

  window.draw = {
    circle: function(ctx, turtleColor, circle) {
      var r;
      r = circle.diam / 2;
      ctx.beginPath();
      ctx.arc(circle.x + r, circle.y + r, r, 0, 2 * Math.PI, false);
      ctx.closePath();
      drawPath(ctx, turtleColor, circle);
    },
    polygon: function(ctx, turtleColor, polygon) {
      var i, x, xcors, y, ycors, _i, _len, _ref;
      xcors = polygon.xcors;
      ycors = polygon.ycors;
      ctx.beginPath();
      ctx.moveTo(xcors[0], ycors[0]);
      _ref = xcors.slice(1);
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        x = _ref[i];
        y = ycors[i + 1];
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      drawPath(ctx, turtleColor, polygon);
    },
    rectangle: function(ctx, turtleColor, rectangle) {
      var h, w, x, y;
      x = rectangle.xmin;
      y = rectangle.ymin;
      w = rectangle.xmax - x;
      h = rectangle.ymax - y;
      setColoring(ctx, turtleColor, rectangle);
      if (rectangle.filled) {
        ctx.fillRect(x, y, w, h);
      } else {
        ctx.strokeRect(x, y, w, h);
      }
    },
    line: function(ctx, turtleColor, line) {
      var h, w, x, y;
      x = line.x1;
      y = line.y1;
      w = line.x2 - line.x1;
      h = line.y2 - line.y1;
      setColoring(ctx, turtleColor, line);
      ctx.lineWidth = 15;
      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      ctx.stroke();
      ctx.lineWidth = .1;
    }
  };

  window.defaultShape = {
    rotate: true,
    elements: [
      {
        type: 'polygon',
        color: 'grey',
        filled: 'true',
        marked: 'true',
        xcors: [150, 40, 150, 260],
        ycors: [5, 250, 205, 250]
      }
    ]
  };

}).call(this);
defaultShapes = {
  "default": {
    "rotate": true,
    "elements": [
      {
        "xcors": [
          150,
          40,
          150,
          260
        ],
        "ycors": [
          5,
          250,
          205,
          250
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "airplane": {
    "rotate": true,
    "elements": [
      {
        "xcors": [
          150,
          135,
          120,
          120,
          15,
          15,
          120,
          135,
          105,
          120,
          150,
          180,
          210,
          165,
          180,
          285,
          285,
          180,
          180,
          165
        ],
        "ycors": [
          0,
          15,
          60,
          105,
          165,
          195,
          180,
          240,
          270,
          285,
          270,
          285,
          270,
          240,
          180,
          195,
          165,
          105,
          60,
          15
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "arrow": {
    "rotate": true,
    "elements": [
      {
        "xcors": [
          150,
          0,
          105,
          105,
          195,
          195,
          300
        ],
        "ycors": [
          0,
          150,
          150,
          293,
          293,
          150,
          150
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "box": {
    "rotate": false,
    "elements": [
      {
        "xcors": [
          150,
          285,
          285,
          150
        ],
        "ycors": [
          285,
          225,
          75,
          135
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          150,
          15,
          150,
          285
        ],
        "ycors": [
          135,
          75,
          15,
          75
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          15,
          15,
          150,
          150
        ],
        "ycors": [
          75,
          225,
          285,
          135
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x1": 150,
        "y1": 285,
        "x2": 150,
        "y2": 135,
        "type": "line",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": false,
        "marked": false
      },
      {
        "x1": 150,
        "y1": 135,
        "x2": 15,
        "y2": 75,
        "type": "line",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": false,
        "marked": false
      },
      {
        "x1": 150,
        "y1": 135,
        "x2": 285,
        "y2": 75,
        "type": "line",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": false,
        "marked": false
      }
    ]
  },
  "bug": {
    "rotate": true,
    "elements": [
      {
        "x": 96,
        "y": 182,
        "diam": 108,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 110,
        "y": 127,
        "diam": 80,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 110,
        "y": 75,
        "diam": 80,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x1": 150,
        "y1": 100,
        "x2": 80,
        "y2": 30,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      },
      {
        "x1": 150,
        "y1": 100,
        "x2": 220,
        "y2": 30,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      }
    ]
  },
  "butterfly": {
    "rotate": true,
    "elements": [
      {
        "xcors": [
          150,
          209,
          225,
          225,
          195,
          165,
          150
        ],
        "ycors": [
          165,
          199,
          225,
          255,
          270,
          255,
          240
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          150,
          89,
          75,
          75,
          105,
          135,
          150
        ],
        "ycors": [
          165,
          198,
          225,
          255,
          270,
          255,
          240
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          139,
          100,
          55,
          25,
          10,
          10,
          25,
          40,
          85,
          139
        ],
        "ycors": [
          148,
          105,
          90,
          90,
          105,
          135,
          180,
          195,
          194,
          163
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          162,
          200,
          245,
          275,
          290,
          290,
          275,
          260,
          215,
          162
        ],
        "ycors": [
          150,
          105,
          90,
          90,
          105,
          135,
          180,
          195,
          195,
          165
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          150,
          135,
          120,
          135,
          150,
          165,
          180,
          165
        ],
        "ycors": [
          255,
          225,
          150,
          120,
          105,
          120,
          150,
          225
        ],
        "type": "polygon",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x": 135,
        "y": 90,
        "diam": 30,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x1": 150,
        "y1": 105,
        "x2": 195,
        "y2": 60,
        "type": "line",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": false,
        "marked": false
      },
      {
        "x1": 150,
        "y1": 105,
        "x2": 105,
        "y2": 60,
        "type": "line",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": false,
        "marked": false
      }
    ]
  },
  "car": {
    "rotate": false,
    "elements": [
      {
        "xcors": [
          300,
          279,
          261,
          240,
          226,
          213,
          203,
          185,
          159,
          135,
          75,
          0,
          0,
          0,
          300,
          300
        ],
        "ycors": [
          180,
          164,
          144,
          135,
          132,
          106,
          84,
          63,
          50,
          50,
          60,
          150,
          165,
          225,
          225,
          180
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 180,
        "y": 180,
        "diam": 90,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x": 30,
        "y": 180,
        "diam": 90,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xcors": [
          162,
          132,
          134,
          209,
          194,
          189,
          180
        ],
        "ycors": [
          80,
          78,
          135,
          135,
          105,
          96,
          89
        ],
        "type": "polygon",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x": 47,
        "y": 195,
        "diam": 58,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 195,
        "y": 195,
        "diam": 58,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "circle": {
    "rotate": false,
    "elements": [
      {
        "x": 0,
        "y": 0,
        "diam": 300,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "circle 2": {
    "rotate": false,
    "elements": [
      {
        "x": 0,
        "y": 0,
        "diam": 300,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 30,
        "y": 30,
        "diam": 240,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      }
    ]
  },
  "cloud": {
    "rotate": false,
    "elements": [
      {
        "x": 13,
        "y": 118,
        "diam": 94,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 86,
        "y": 101,
        "diam": 127,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 51,
        "y": 51,
        "diam": 108,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 118,
        "y": 43,
        "diam": 95,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 158,
        "y": 68,
        "diam": 134,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "co2-molecule": {
    "rotate": true,
    "elements": [
      {
        "x": 183,
        "y": 63,
        "diam": 84,
        "type": "circle",
        "color": "rgba(255, 255, 255, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x": 183,
        "y": 63,
        "diam": 84,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": false,
        "marked": false
      },
      {
        "x": 75,
        "y": 75,
        "diam": 150,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 75,
        "y": 75,
        "diam": 150,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": false,
        "marked": false
      },
      {
        "x": 33,
        "y": 63,
        "diam": 84,
        "type": "circle",
        "color": "rgba(255, 255, 255, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x": 33,
        "y": 63,
        "diam": 84,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": false,
        "marked": false
      }
    ]
  },
  "cow": {
    "rotate": false,
    "elements": [
      {
        "xcors": [
          200,
          197,
          179,
          177,
          166,
          140,
          93,
          78,
          72,
          49,
          48,
          37,
          25,
          25,
          45,
          103,
          179,
          198,
          252,
          272,
          293,
          285,
          255,
          242,
          224
        ],
        "ycors": [
          193,
          249,
          249,
          196,
          187,
          189,
          191,
          179,
          211,
          209,
          181,
          149,
          120,
          89,
          72,
          84,
          75,
          76,
          64,
          81,
          103,
          121,
          121,
          118,
          167
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          73,
          86,
          62,
          48
        ],
        "ycors": [
          210,
          251,
          249,
          208
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          25,
          16,
          9,
          23,
          25,
          39
        ],
        "ycors": [
          114,
          195,
          204,
          213,
          200,
          123
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "cylinder": {
    "rotate": false,
    "elements": [
      {
        "x": 0,
        "y": 0,
        "diam": 300,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "dot": {
    "rotate": false,
    "elements": [
      {
        "x": 90,
        "y": 90,
        "diam": 120,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "face happy": {
    "rotate": false,
    "elements": [
      {
        "x": 8,
        "y": 8,
        "diam": 285,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 60,
        "y": 75,
        "diam": 60,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x": 180,
        "y": 75,
        "diam": 60,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xcors": [
          150,
          90,
          62,
          47,
          67,
          90,
          109,
          150,
          192,
          210,
          227,
          251,
          236,
          212
        ],
        "ycors": [
          255,
          239,
          213,
          191,
          179,
          203,
          218,
          225,
          218,
          203,
          181,
          194,
          217,
          240
        ],
        "type": "polygon",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      }
    ]
  },
  "face neutral": {
    "rotate": false,
    "elements": [
      {
        "x": 8,
        "y": 7,
        "diam": 285,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 60,
        "y": 75,
        "diam": 60,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x": 180,
        "y": 75,
        "diam": 60,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xmin": 60,
        "ymin": 195,
        "xmax": 240,
        "ymax": 225,
        "type": "rectangle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      }
    ]
  },
  "face sad": {
    "rotate": false,
    "elements": [
      {
        "x": 8,
        "y": 8,
        "diam": 285,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 60,
        "y": 75,
        "diam": 60,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x": 180,
        "y": 75,
        "diam": 60,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xcors": [
          150,
          90,
          62,
          47,
          67,
          90,
          109,
          150,
          192,
          210,
          227,
          251,
          236,
          212
        ],
        "ycors": [
          168,
          184,
          210,
          232,
          244,
          220,
          205,
          198,
          205,
          220,
          242,
          229,
          206,
          183
        ],
        "type": "polygon",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      }
    ]
  },
  "fish": {
    "rotate": false,
    "elements": [
      {
        "xcors": [
          44,
          21,
          15,
          0,
          15,
          0,
          13,
          20,
          45
        ],
        "ycors": [
          131,
          87,
          86,
          120,
          150,
          180,
          214,
          212,
          166
        ],
        "type": "polygon",
        "color": "rgba(255, 255, 255, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xcors": [
          135,
          119,
          95,
          76,
          46,
          60
        ],
        "ycors": [
          195,
          235,
          218,
          210,
          204,
          165
        ],
        "type": "polygon",
        "color": "rgba(255, 255, 255, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xcors": [
          75,
          83,
          71,
          86,
          166,
          135
        ],
        "ycors": [
          45,
          77,
          103,
          114,
          78,
          60
        ],
        "type": "polygon",
        "color": "rgba(255, 255, 255, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xcors": [
          30,
          151,
          226,
          280,
          292,
          292,
          287,
          270,
          195,
          151,
          30
        ],
        "ycors": [
          136,
          77,
          81,
          119,
          146,
          160,
          170,
          195,
          210,
          212,
          166
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 215,
        "y": 106,
        "diam": 30,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      }
    ]
  },
  "flag": {
    "rotate": false,
    "elements": [
      {
        "xmin": 60,
        "ymin": 15,
        "xmax": 75,
        "ymax": 300,
        "type": "rectangle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          90,
          270,
          90
        ],
        "ycors": [
          150,
          90,
          30
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x1": 75,
        "y1": 135,
        "x2": 90,
        "y2": 135,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      },
      {
        "x1": 75,
        "y1": 45,
        "x2": 90,
        "y2": 45,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      }
    ]
  },
  "flower": {
    "rotate": false,
    "elements": [
      {
        "xcors": [
          135,
          165,
          180,
          180,
          150,
          165,
          195,
          195,
          165
        ],
        "ycors": [
          120,
          165,
          210,
          240,
          300,
          300,
          240,
          195,
          135
        ],
        "type": "polygon",
        "color": "rgba(89, 176, 60, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x": 85,
        "y": 132,
        "diam": 38,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 130,
        "y": 147,
        "diam": 38,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 192,
        "y": 85,
        "diam": 38,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 85,
        "y": 40,
        "diam": 38,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 177,
        "y": 40,
        "diam": 38,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 177,
        "y": 132,
        "diam": 38,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 70,
        "y": 85,
        "diam": 38,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 130,
        "y": 25,
        "diam": 38,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 96,
        "y": 51,
        "diam": 108,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 113,
        "y": 68,
        "diam": 74,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xcors": [
          189,
          219,
          249,
          279,
          234
        ],
        "ycors": [
          233,
          188,
          173,
          188,
          218
        ],
        "type": "polygon",
        "color": "rgba(89, 176, 60, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xcors": [
          180,
          150,
          105,
          75,
          135
        ],
        "ycors": [
          255,
          210,
          210,
          240,
          240
        ],
        "type": "polygon",
        "color": "rgba(89, 176, 60, 1.0)",
        "filled": true,
        "marked": false
      }
    ]
  },
  "house": {
    "rotate": false,
    "elements": [
      {
        "xmin": 45,
        "ymin": 120,
        "xmax": 255,
        "ymax": 285,
        "type": "rectangle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xmin": 120,
        "ymin": 210,
        "xmax": 180,
        "ymax": 285,
        "type": "rectangle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xcors": [
          15,
          150,
          285
        ],
        "ycors": [
          120,
          15,
          120
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x1": 30,
        "y1": 120,
        "x2": 270,
        "y2": 120,
        "type": "line",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": false,
        "marked": false
      }
    ]
  },
  "leaf": {
    "rotate": false,
    "elements": [
      {
        "xcors": [
          150,
          135,
          120,
          60,
          30,
          60,
          60,
          15,
          30,
          15,
          40,
          45,
          60,
          90,
          105,
          120,
          105,
          120,
          135,
          150,
          165,
          180,
          195,
          180,
          195,
          210,
          240,
          255,
          263,
          285,
          270,
          285,
          240,
          240,
          270,
          240,
          180,
          165
        ],
        "ycors": [
          210,
          195,
          210,
          210,
          195,
          180,
          165,
          135,
          120,
          105,
          104,
          90,
          90,
          105,
          120,
          120,
          60,
          60,
          30,
          15,
          30,
          60,
          60,
          120,
          120,
          105,
          90,
          90,
          104,
          105,
          120,
          135,
          165,
          180,
          195,
          210,
          210,
          195
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          135,
          135,
          120,
          105,
          105,
          135,
          165,
          165
        ],
        "ycors": [
          195,
          240,
          255,
          255,
          285,
          285,
          240,
          195
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "line": {
    "rotate": true,
    "elements": [
      {
        "x1": 150,
        "y1": 0,
        "x2": 150,
        "y2": 300,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      }
    ]
  },
  "line half": {
    "rotate": true,
    "elements": [
      {
        "x1": 150,
        "y1": 0,
        "x2": 150,
        "y2": 150,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      }
    ]
  },
  "molecule water": {
    "rotate": true,
    "elements": [
      {
        "x": 183,
        "y": 63,
        "diam": 84,
        "type": "circle",
        "color": "rgba(255, 255, 255, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x": 183,
        "y": 63,
        "diam": 84,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": false,
        "marked": false
      },
      {
        "x": 75,
        "y": 75,
        "diam": 150,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 75,
        "y": 75,
        "diam": 150,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": false,
        "marked": false
      },
      {
        "x": 33,
        "y": 63,
        "diam": 84,
        "type": "circle",
        "color": "rgba(255, 255, 255, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x": 33,
        "y": 63,
        "diam": 84,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": false,
        "marked": false
      }
    ]
  },
  "pentagon": {
    "rotate": false,
    "elements": [
      {
        "xcors": [
          150,
          15,
          60,
          240,
          285
        ],
        "ycors": [
          15,
          120,
          285,
          285,
          120
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "person": {
    "rotate": false,
    "elements": [
      {
        "x": 110,
        "y": 5,
        "diam": 80,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          105,
          120,
          90,
          105,
          135,
          150,
          165,
          195,
          210,
          180,
          195
        ],
        "ycors": [
          90,
          195,
          285,
          300,
          300,
          225,
          300,
          300,
          285,
          195,
          90
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xmin": 127,
        "ymin": 79,
        "xmax": 172,
        "ymax": 94,
        "type": "rectangle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          195,
          240,
          225,
          165
        ],
        "ycors": [
          90,
          150,
          180,
          105
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          105,
          60,
          75,
          135
        ],
        "ycors": [
          90,
          150,
          180,
          105
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "plant": {
    "rotate": false,
    "elements": [
      {
        "xmin": 135,
        "ymin": 90,
        "xmax": 165,
        "ymax": 300,
        "type": "rectangle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          135,
          90,
          45,
          75,
          135
        ],
        "ycors": [
          255,
          210,
          195,
          255,
          285
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          165,
          210,
          255,
          225,
          165
        ],
        "ycors": [
          255,
          210,
          195,
          255,
          285
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          135,
          90,
          45,
          75,
          135
        ],
        "ycors": [
          180,
          135,
          120,
          180,
          210
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          165,
          165,
          225,
          255,
          210
        ],
        "ycors": [
          180,
          210,
          180,
          120,
          135
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          135,
          90,
          45,
          75,
          135
        ],
        "ycors": [
          105,
          60,
          45,
          105,
          135
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          165,
          165,
          225,
          255,
          210
        ],
        "ycors": [
          105,
          135,
          105,
          45,
          60
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          135,
          120,
          150,
          180,
          165
        ],
        "ycors": [
          90,
          45,
          15,
          45,
          90
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "ray": {
    "rotate": true,
    "elements": [
      {
        "x1": 150,
        "y1": 0,
        "x2": 150,
        "y2": 315,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      },
      {
        "x1": 120,
        "y1": 255,
        "x2": 150,
        "y2": 225,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      },
      {
        "x1": 150,
        "y1": 225,
        "x2": 180,
        "y2": 255,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      },
      {
        "x1": 120,
        "y1": 165,
        "x2": 150,
        "y2": 135,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      },
      {
        "x1": 120,
        "y1": 75,
        "x2": 150,
        "y2": 45,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      },
      {
        "x1": 150,
        "y1": 135,
        "x2": 180,
        "y2": 165,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      },
      {
        "x1": 150,
        "y1": 45,
        "x2": 180,
        "y2": 75,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      }
    ]
  },
  "sheep": {
    "rotate": false,
    "elements": [
      {
        "x": 203,
        "y": 65,
        "diam": 88,
        "type": "circle",
        "color": "rgba(255, 255, 255, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 70,
        "y": 65,
        "diam": 162,
        "type": "circle",
        "color": "rgba(255, 255, 255, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 150,
        "y": 105,
        "diam": 120,
        "type": "circle",
        "color": "rgba(255, 255, 255, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          218,
          240,
          255,
          278
        ],
        "ycors": [
          120,
          165,
          165,
          120
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x": 214,
        "y": 72,
        "diam": 67,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xmin": 164,
        "ymin": 223,
        "xmax": 179,
        "ymax": 298,
        "type": "rectangle",
        "color": "rgba(255, 255, 255, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          45,
          30,
          30,
          15,
          45
        ],
        "ycors": [
          285,
          285,
          240,
          195,
          210
        ],
        "type": "polygon",
        "color": "rgba(255, 255, 255, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 3,
        "y": 83,
        "diam": 150,
        "type": "circle",
        "color": "rgba(255, 255, 255, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xmin": 65,
        "ymin": 221,
        "xmax": 80,
        "ymax": 296,
        "type": "rectangle",
        "color": "rgba(255, 255, 255, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          195,
          210,
          210,
          240,
          195
        ],
        "ycors": [
          285,
          285,
          240,
          210,
          210
        ],
        "type": "polygon",
        "color": "rgba(255, 255, 255, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          276,
          285,
          302,
          294
        ],
        "ycors": [
          85,
          105,
          99,
          83
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xcors": [
          219,
          210,
          193,
          201
        ],
        "ycors": [
          85,
          105,
          99,
          83
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": false
      }
    ]
  },
  "square": {
    "rotate": false,
    "elements": [
      {
        "xmin": 30,
        "ymin": 30,
        "xmax": 270,
        "ymax": 270,
        "type": "rectangle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "square 2": {
    "rotate": false,
    "elements": [
      {
        "xmin": 30,
        "ymin": 30,
        "xmax": 270,
        "ymax": 270,
        "type": "rectangle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xmin": 60,
        "ymin": 60,
        "xmax": 240,
        "ymax": 240,
        "type": "rectangle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      }
    ]
  },
  "star": {
    "rotate": false,
    "elements": [
      {
        "xcors": [
          151,
          185,
          298,
          207,
          242,
          151,
          59,
          94,
          3,
          116
        ],
        "ycors": [
          1,
          108,
          108,
          175,
          282,
          216,
          282,
          175,
          108,
          108
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "target": {
    "rotate": false,
    "elements": [
      {
        "x": 0,
        "y": 0,
        "diam": 300,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 30,
        "y": 30,
        "diam": 240,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x": 60,
        "y": 60,
        "diam": 180,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 90,
        "y": 90,
        "diam": 120,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x": 120,
        "y": 120,
        "diam": 60,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "tree": {
    "rotate": false,
    "elements": [
      {
        "x": 118,
        "y": 3,
        "diam": 94,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xmin": 120,
        "ymin": 195,
        "xmax": 180,
        "ymax": 300,
        "type": "rectangle",
        "color": "rgba(157, 110, 72, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x": 65,
        "y": 21,
        "diam": 108,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 116,
        "y": 41,
        "diam": 127,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 45,
        "y": 90,
        "diam": 120,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 104,
        "y": 74,
        "diam": 152,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "triangle": {
    "rotate": false,
    "elements": [
      {
        "xcors": [
          150,
          15,
          285
        ],
        "ycors": [
          30,
          255,
          255
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "triangle 2": {
    "rotate": false,
    "elements": [
      {
        "xcors": [
          150,
          15,
          285
        ],
        "ycors": [
          30,
          255,
          255
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          151,
          225,
          75
        ],
        "ycors": [
          99,
          223,
          224
        ],
        "type": "polygon",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      }
    ]
  },
  "truck": {
    "rotate": false,
    "elements": [
      {
        "xmin": 4,
        "ymin": 45,
        "xmax": 195,
        "ymax": 187,
        "type": "rectangle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          296,
          296,
          259,
          244,
          208,
          207
        ],
        "ycors": [
          193,
          150,
          134,
          104,
          104,
          194
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xmin": 195,
        "ymin": 60,
        "xmax": 195,
        "ymax": 105,
        "type": "rectangle",
        "color": "rgba(255, 255, 255, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xcors": [
          238,
          252,
          219,
          218
        ],
        "ycors": [
          112,
          141,
          141,
          112
        ],
        "type": "polygon",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x": 234,
        "y": 174,
        "diam": 42,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xmin": 181,
        "ymin": 185,
        "xmax": 214,
        "ymax": 194,
        "type": "rectangle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 144,
        "y": 174,
        "diam": 42,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x": 24,
        "y": 174,
        "diam": 42,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x": 24,
        "y": 174,
        "diam": 42,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      },
      {
        "x": 144,
        "y": 174,
        "diam": 42,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      },
      {
        "x": 234,
        "y": 174,
        "diam": 42,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      }
    ]
  },
  "turtle": {
    "rotate": true,
    "elements": [
      {
        "xcors": [
          215,
          240,
          246,
          228,
          215,
          193
        ],
        "ycors": [
          204,
          233,
          254,
          266,
          252,
          210
        ],
        "type": "polygon",
        "color": "rgba(89, 176, 60, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xcors": [
          195,
          225,
          245,
          260,
          269,
          261,
          240,
          225,
          210
        ],
        "ycors": [
          90,
          75,
          75,
          89,
          108,
          124,
          105,
          105,
          105
        ],
        "type": "polygon",
        "color": "rgba(89, 176, 60, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xcors": [
          105,
          75,
          55,
          40,
          31,
          39,
          60,
          75,
          90
        ],
        "ycors": [
          90,
          75,
          75,
          89,
          108,
          124,
          105,
          105,
          105
        ],
        "type": "polygon",
        "color": "rgba(89, 176, 60, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xcors": [
          132,
          134,
          107,
          108,
          150,
          192,
          192,
          169,
          172
        ],
        "ycors": [
          85,
          64,
          51,
          17,
          2,
          18,
          52,
          65,
          87
        ],
        "type": "polygon",
        "color": "rgba(89, 176, 60, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xcors": [
          85,
          60,
          54,
          72,
          85,
          107
        ],
        "ycors": [
          204,
          233,
          254,
          266,
          252,
          210
        ],
        "type": "polygon",
        "color": "rgba(89, 176, 60, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xcors": [
          119,
          179,
          209,
          224,
          220,
          175,
          128,
          81,
          74,
          88
        ],
        "ycors": [
          75,
          75,
          101,
          135,
          225,
          261,
          261,
          224,
          135,
          99
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "wheel": {
    "rotate": false,
    "elements": [
      {
        "x": 3,
        "y": 3,
        "diam": 294,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x": 30,
        "y": 30,
        "diam": 240,
        "type": "circle",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "x1": 150,
        "y1": 285,
        "x2": 150,
        "y2": 15,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      },
      {
        "x1": 15,
        "y1": 150,
        "x2": 285,
        "y2": 150,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      },
      {
        "x": 120,
        "y": 120,
        "diam": 60,
        "type": "circle",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "x1": 216,
        "y1": 40,
        "x2": 79,
        "y2": 269,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      },
      {
        "x1": 40,
        "y1": 84,
        "x2": 269,
        "y2": 221,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      },
      {
        "x1": 40,
        "y1": 216,
        "x2": 269,
        "y2": 79,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      },
      {
        "x1": 84,
        "y1": 40,
        "x2": 221,
        "y2": 269,
        "type": "line",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": false,
        "marked": true
      }
    ]
  },
  "wolf": {
    "rotate": false,
    "elements": [
      {
        "xcors": [
          253,
          245,
          245
        ],
        "ycors": [
          133,
          131,
          133
        ],
        "type": "polygon",
        "color": "rgba(0, 0, 0, 1.0)",
        "filled": true,
        "marked": false
      },
      {
        "xcors": [
          2,
          13,
          30,
          38,
          38,
          20,
          20,
          27,
          38,
          40,
          31,
          31,
          60,
          68,
          75,
          66,
          65,
          82,
          84,
          100,
          103,
          77,
          79,
          100,
          98,
          119,
          143,
          160,
          166,
          172,
          173,
          167,
          160,
          154,
          169,
          178,
          186,
          198,
          200,
          217,
          219,
          207,
          195,
          192,
          210,
          227,
          242,
          259,
          284,
          277,
          293,
          299,
          297,
          273,
          270
        ],
        "ycors": [
          194,
          197,
          191,
          193,
          205,
          226,
          257,
          265,
          266,
          260,
          253,
          230,
          206,
          198,
          209,
          228,
          243,
          261,
          268,
          267,
          261,
          239,
          231,
          207,
          196,
          201,
          202,
          195,
          210,
          213,
          238,
          251,
          248,
          265,
          264,
          247,
          240,
          260,
          271,
          271,
          262,
          258,
          230,
          198,
          184,
          164,
          144,
          145,
          151,
          141,
          140,
          134,
          127,
          119,
          105
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          -1,
          14,
          36,
          40,
          53,
          82,
          134,
          159,
          188,
          227,
          236,
          238,
          268,
          269,
          281,
          269,
          269
        ],
        "ycors": [
          195,
          180,
          166,
          153,
          140,
          131,
          133,
          126,
          115,
          108,
          102,
          98,
          86,
          92,
          87,
          103,
          113
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  },
  "x": {
    "rotate": false,
    "elements": [
      {
        "xcors": [
          270,
          225,
          30,
          75
        ],
        "ycors": [
          75,
          30,
          225,
          270
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      },
      {
        "xcors": [
          30,
          75,
          270,
          225
        ],
        "ycors": [
          75,
          30,
          225,
          270
        ],
        "type": "polygon",
        "color": "rgba(141, 141, 141, 1.0)",
        "filled": true,
        "marked": true
      }
    ]
  }
}
;
(function() {
  var PatchView, TurtleView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (!(window.AgentModel != null)) {
    console.error('view.js requires agentmodel.js!');
  }

  window.AgentStreamController = (function() {

    function AgentStreamController(container) {
      this.container = container;
      this.layers = document.createElement('div');
      this.layers.style.width = '100%';
      this.layers.style.position = 'relative';
      this.layers.classList.add('view-layers');
      this.container.appendChild(this.layers);
      this.turtleView = new TurtleView();
      this.patchView = new PatchView();
      this.turtleView.canvas.style.position = 'absolute';
      this.turtleView.canvas.style.top = '0px';
      this.turtleView.canvas.style.left = '0px';
      this.layers.appendChild(this.patchView.canvas);
      this.layers.appendChild(this.turtleView.canvas);
      this.model = new AgentModel();
      this.model.world.turtleshapelist = defaultShapes;
      this.repaint();
    }

    AgentStreamController.prototype.repaint = function() {
      this.turtleView.repaint(this.model.world, this.model.turtles, this.model.links);
      return this.patchView.repaint(this.model.world, this.model.patches);
    };

    AgentStreamController.prototype.update = function(modelUpdate) {
      return this.model.update(modelUpdate);
    };

    return AgentStreamController;

  })();

  View = (function() {

    function View() {
      this.quality = 1;
      this.canvas = document.createElement('canvas');
      this.canvas["class"] = 'netlogo-canvas';
      this.canvas.width = 500;
      this.canvas.height = 500;
      this.canvas.style.width = "100%";
      this.ctx = this.canvas.getContext('2d');
    }

    View.prototype.matchesWorld = function(world) {
      return ((this.maxpxcor != null) && (this.minpxcor != null) && (this.maxpycor != null) && (this.minpycor != null) && (this.patchsize != null)) && (!(world.maxpxcor != null) || world.maxpxcor === this.maxpxcor) && (!(world.minpxcor != null) || world.minpxcor === this.minpxcor) && (!(world.maxpycor != null) || world.maxpycor === this.maxpycor) && (!(world.minpycor != null) || world.minpycor === this.minpycor) && (!(world.patchsize != null) || world.patchsize === this.patchsize);
    };

    View.prototype.transformToWorld = function(world) {
      this.maxpxcor = world.maxpxcor != null ? world.maxpxcor : 25;
      this.minpxcor = world.minpxcor != null ? world.minpxcor : -25;
      this.maxpycor = world.maxpycor != null ? world.maxpycor : 25;
      this.minpycor = world.minpycor != null ? world.minpycor : -25;
      this.patchsize = world.patchsize != null ? world.patchsize : 9;
      this.onePixel = 1 / this.patchsize;
      this.patchWidth = this.maxpxcor - this.minpxcor + 1;
      this.patchHeight = this.maxpycor - this.minpycor + 1;
      this.canvas.width = this.patchWidth * this.patchsize * this.quality;
      this.canvas.height = this.patchHeight * this.patchsize * this.quality;
      this.ctx.setTransform(this.canvas.width / this.patchWidth, 0, 0, -this.canvas.height / this.patchHeight, -(this.minpxcor - .5) * this.canvas.width / this.patchWidth, (this.maxpycor + .5) * this.canvas.height / this.patchHeight);
      return this.ctx.font = '10pt "Lucida Grande", sans-serif';
    };

    View.prototype.drawLabel = function(label, color, x, y) {
      label = label != null ? label.toString() : '';
      if (label.length > 0) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.scale(1 / this.patchsize, -1 / this.patchsize);
        this.ctx.textAlign = 'end';
        this.ctx.fillStyle = netlogoColorToCSS(color);
        this.ctx.fillText(label, 0, 0);
        return this.ctx.restore();
      }
    };

    return View;

  })();

  TurtleView = (function(_super) {

    __extends(TurtleView, _super);

    function TurtleView() {
      TurtleView.__super__.constructor.call(this);
      this.drawer = new CachingShapeDrawer({});
      this.quality = 3;
    }

    TurtleView.prototype.drawTurtle = function(id, turtle) {
      var angle, heading, scale, shape, shapeName, xcor, ycor;
      xcor = turtle.xcor || 0;
      ycor = turtle.ycor || 0;
      heading = turtle.heading || 0;
      scale = turtle.size || 1;
      angle = (180 - heading) / 360 * 2 * Math.PI;
      shapeName = turtle.shape;
      shape = this.drawer.shapes[shapeName] || defaultShape;
      this.ctx.save();
      this.ctx.translate(xcor, ycor);
      if (shape.rotate) {
        this.ctx.rotate(angle);
      } else {
        this.ctx.rotate(Math.PI);
      }
      this.ctx.scale(scale, scale);
      this.drawer.drawShape(this.ctx, turtle.color, shapeName);
      this.ctx.restore();
      return this.drawLabel(turtle.label, turtle['label-color'], xcor + turtle.size / 2, ycor - turtle.size / 2);
    };

    TurtleView.prototype.drawLink = function(link, turtles) {
      var end1, end2;
      end1 = turtles[link.end1];
      end2 = turtles[link.end2];
      this.ctx.strokeStyle = netlogoColorToCSS(link.color);
      this.ctx.lineWidth = link.thickness > this.onePixel ? link.thickness : this.onePixel;
      this.ctx.beginPath();
      this.ctx.moveTo(end1.xcor, end1.ycor);
      this.ctx.lineTo(end2.xcor, end2.ycor);
      return this.ctx.stroke();
    };

    TurtleView.prototype.repaint = function(world, turtles, links) {
      var id, link, turtle;
      this.transformToWorld(world);
      if (world.turtleshapelist !== this.drawer.shapes && typeof world.turtleshapelist === "object") {
        this.drawer = new CachingShapeDrawer(world.turtleshapelist);
      }
      for (id in links) {
        link = links[id];
        this.drawLink(link, turtles);
      }
      this.ctx.lineWidth = this.onePixel;
      for (id in turtles) {
        turtle = turtles[id];
        this.drawTurtle(id, turtle);
      }
    };

    return TurtleView;

  })(View);

  PatchView = (function(_super) {

    __extends(PatchView, _super);

    function PatchView() {
      PatchView.__super__.constructor.call(this);
      this.patchColors = [];
      this.scratchCanvas = document.createElement('canvas');
      this.scratchCtx = this.scratchCanvas.getContext('2d');
      this.quality = 2;
    }

    PatchView.prototype.transformToWorld = function(world) {
      PatchView.__super__.transformToWorld.call(this, world);
      this.scratchCanvas.width = this.patchWidth;
      this.scratchCanvas.height = this.patchHeight;
      this.ctx.imageSmoothingEnabled = false;
      this.ctx.webkitImageSmoothingEnabled = false;
      this.ctx.mozImageSmoothingEnabled = false;
      this.ctx.oImageSmoothingEnabled = false;
      this.ctx.fillStyle = 'black';
      return this.ctx.fillRect(this.minpxcor - .5, this.minpycor - .5, this.patchWidth, this.patchHeight);
    };

    PatchView.prototype.colorPatches = function(patches) {
      var b, g, i, ignore, imageData, patch, r, trans, _ref, _results;
      imageData = this.ctx.createImageData(this.patchWidth, this.patchHeight);
      for (ignore in patches) {
        patch = patches[ignore];
        _ref = netlogoColorToRGB(patch.pcolor), r = _ref[0], g = _ref[1], b = _ref[2];
        i = ((this.maxpycor - patch.pycor) * this.patchWidth + (patch.pxcor - this.minpxcor)) * 4;
        imageData.data[i + 0] = r;
        imageData.data[i + 1] = g;
        imageData.data[i + 2] = b;
        imageData.data[i + 3] = 255;
      }
      this.scratchCtx.putImageData(imageData, 0, 0);
      trans = this.minpycor + this.maxpycor;
      this.ctx.translate(0, trans);
      this.ctx.scale(1, -1);
      this.ctx.drawImage(this.scratchCanvas, this.minpxcor - .5, this.minpycor - .5, this.patchWidth, this.patchHeight);
      this.ctx.scale(1, -1);
      this.ctx.translate(0, -trans);
      _results = [];
      for (ignore in patches) {
        patch = patches[ignore];
        _results.push(this.drawLabel(patch.plabel, patch['plabel-color'], patch.pxcor + .5, patch.pycor - .5));
      }
      return _results;
    };

    PatchView.prototype.repaint = function(world, patches) {
      if (!this.matchesWorld(world)) {
        this.transformToWorld(world);
      }
      return this.colorPatches(patches);
    };

    return PatchView;

  })(View);

}).call(this);
(function() {
  var Connection;

  window.connect = function(socketURL) {
    return new Connection(new WebSocket(socketURL));
  };

  Connection = (function() {

    function Connection(socket) {
      var _this = this;
      this.socket = socket;
      this.listeners = {
        'all': []
      };
      this.outbox = [];
      this.socket.onmessage = function(event) {
        return _this.dispatch(JSON.parse(event.data));
      };
      this.socket.onopen = function() {
        var msg, _i, _len, _ref, _results;
        _ref = _this.outbox;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          msg = _ref[_i];
          _results.push(_this.send(msg));
        }
        return _results;
      };
    }

    Connection.prototype.send = function(message) {
      if (this.socket.readyState === this.socket.OPEN) {
        return this.socket.send(JSON.stringify(message));
      } else {
        return this.outbox.push(message);
      }
    };

    Connection.prototype.dispatch = function(msg) {
      var listener, _i, _j, _len, _len1, _ref, _ref1, _results;
      _ref = this.listeners['all'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        listener = _ref[_i];
        listener(msg);
      }
      if (!(this.listeners[msg.kind] != null)) {
        this.listeners[msg.kind] = [];
      }
      _ref1 = this.listeners[msg.kind];
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        listener = _ref1[_j];
        _results.push(listener(msg));
      }
      return _results;
    };

    Connection.prototype.on = function(kind, listener) {
      if (!(this.listeners[kind] != null)) {
        this.listeners[kind] = [];
      }
      return this.listeners[kind].push(listener);
    };

    return Connection;

  })();

}).call(this);
;
(function() {

  window.SessionLite = (function() {

    SessionLite.controller = void 0;

    function SessionLite(container) {
      container.innerHTML = "";
      this.controller = new AgentStreamController(container);
    }

    SessionLite.prototype.update = function(modelUpdate) {
      var update, _i, _len;
      if (modelUpdate instanceof Array) {
        for (_i = 0, _len = modelUpdate.length; _i < _len; _i++) {
          update = modelUpdate[_i];
          this.controller.update(update);
        }
      } else {
        this.controller.update(modelUpdate);
      }
      return this.controller.repaint();
    };

    return SessionLite;

  })();

}).call(this);
