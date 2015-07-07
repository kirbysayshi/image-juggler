function imageToCanvas(image, opt_cvs, cb) {
  if (!cb) { cb = opt_cvs; opt_cvs = null; }
  var cvs = opt_cvs || document.createElement('canvas');
  var ctx = cvs.getContext('2d');
  cvs.width = image.width;
  cvs.height = image.height;
  ctx.drawImage(image, 0, 0);
  cb(null, cvs);
}

function imageToArrayBuffer(image, cb) {
  var reader = new FileReader();
  reader.onload = function() {
    cb(reader.error, reader.result);
  }
  imageToCanvas(image, function(err, cvs) {
    cvs.toBlob(reader.readAsArrayBuffer.bind(reader))
  })
}

function fileToArrayBuffer(file, cb) {
  var reader = new FileReader();
  reader.onload = function() {
    cb(reader.error, reader.result);
  }
  reader.readAsArrayBuffer(file);
}

function imageDataToImage(imageData, opt_image, cb) {
  if (!cb) { cb = opt_image; opt_image = null; }
  var img = opt_image || document.createElement('img');
  var cvs = document.createElement('canvas');
  var ctx = cvs.getContext('2d');
  cvs.width = imageData.width;
  cvs.height = imageData.height;
  ctx.putImageData(imageData, 0, 0);
  canvasToImage(cvs, img, cb);
}

function fileToImage(file, opt_image, cb) {
  if (!cb) { cb = opt_image; opt_image = null; }
  var img = opt_image || document.createElement('img');
  var url = URL.createObjectURL(file);
  img.onload = function() {
    URL.revokeObjectURL(url);
    cb(null, img);
  }
  img.src = url;
}

function canvasToImage(canvas, opt_image, cb) {
  if (!cb) { cb = opt_image; opt_image = null; }
  var url;
  var img = opt_image || document.createElement('img');
  img.onload = function() {
    URL.revokeObjectURL(url);
    cb(null, img);
  }
  canvas.toBlob(function(blob) {
    url = URL.createObjectURL(blob);
    img.src = url;
  });
}

function blobToImage(blob, opt_image, cb) {
  if (!cb) { cb = opt_image; opt_image = null; }
  var img = opt_image || document.createElement('img');
  var url = URL.createObjectURL(blob);
  img.onload = function() {
    URL.revokeObjectURL(url);
    cb(null, img);
  }
  img.src = url;
}

function pixelsToCanvas(pixels, opt_canvas, cb) {
  if (!cb) { cb = opt_canvas; opt_canvas = null; }
  var cvs = opt_canvas || document.createElement('canvas');
  var width = pixels.width || cvs.width;
  var height = pixels.height || cvs.height;
  cvs.width = width;
  cvs.height = height;
  var ctx = cvs.getContext('2d');
  var imgdata = ctx.createImageData(width, height);
  for (var i = 0; i < pixels.length; i++) {
    imgdata.data[i] = pixels[i];
  }
  ctx.putImageData(imgdata, 0, 0);
  cb(null, cvs);
}

exports.imageToCanvas = imageToCanvas;
exports.imageToArrayBuffer = imageToArrayBuffer;
exports.imageDataToImage = imageDataToImage;
exports.fileToArrayBuffer = fileToArrayBuffer;
exports.fileToImage = fileToImage;
exports.canvasToImage = canvasToImage;
exports.blobToImage = blobToImage;
