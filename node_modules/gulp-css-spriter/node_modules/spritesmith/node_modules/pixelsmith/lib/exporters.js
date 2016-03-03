// Load our dependencies
var concat = require('concat-stream');
var ndarrayFill = require('ndarray-fill');
var savePixels = require('save-pixels');
var exporters = {};

// Function to add new exporters
function addExporter(name, exporter) {
  exporters[name] = exporter;
}

// Helper to create exporters (could be a class for better abstraction)
function getExporter(ext) {
  /**
   * Generic exporter
   * @param {Object} options Options to export with
   * @param {Function} cb Error-first callback to return binary image string to
   */
  return function getExporterFn (options, cb) {
    // If we have a custom background, fill it in (otherwise default is transparent black `rgba(0, 0, 0, 0)`)
    var ndarray = this.ndarray;
    if (options.background) {
      ndarrayFill(ndarray, function fillBackground (i, j, k) {
        return options.background[k];
      });
    }

    // Add each image to the canvas
    var images = this.images;
    images.forEach(function getUrlPath (imageObj) {
      // Iterate over the image's data across its rows
      // setting the original data at that offset
      // [1, 2, 0, 0,
      //  3, 4, 0, 0,
      //  0, 0, 5, 0,
      //  0, 0, 0, 6]
      var img = imageObj.img;
      var xOffset = imageObj.x;
      var yOffset = imageObj.y;
      var colIndex = 0;
      var colCount = img.width; // DEV: Use `width` for padding
      for (; colIndex < colCount; colIndex += 1) {
        var rowIndex = 0;
        var rowCount = img.height; // DEV: Use `height` for padding
        for (; rowIndex < rowCount; rowIndex += 1) {
          var rgbaIndex = 0;
          var rgbaCount = 4;
          for (; rgbaIndex < rgbaCount; rgbaIndex += 1) {
            // If we are working with a 4 dimensional array, ignore the first dimension
            // DEV: This is a GIF; [frames, width, height, rgba]
            var val;
            if (img.shape.length === 4) {
              val = img.get(0, colIndex, rowIndex, rgbaIndex);
            // Otherwise, transfer data directly
            } else {
              val = img.get(colIndex, rowIndex, rgbaIndex);
            }
            ndarray.set(xOffset + colIndex, yOffset + rowIndex, rgbaIndex, val);
          }
        }
      }
    });

    // Concatenate the ndarray into a png
    // TODO: We should start sending back streams
    savePixels(ndarray, ext).pipe(concat(function concatenateImage (buff) {
      cb(null, buff.toString('binary'));
    }));
  };
}

// Generate the image exporters
var pngExporter = getExporter('png');
addExporter('png', pngExporter);
addExporter('image/png', pngExporter);
var jpegExporter = getExporter('jpeg');
addExporter('jpg', jpegExporter);
addExporter('image/jpg', jpegExporter);
addExporter('jpeg', jpegExporter);
addExporter('image/jpeg', jpegExporter);
var gifExporter = getExporter('gif');
addExporter('gif', gifExporter);
addExporter('image/gif', gifExporter);

// Export our exporters
module.exports = {
  exporters: exporters,
  addExporter: addExporter
};
