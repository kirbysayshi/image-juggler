image-juggler
=============

The web has some nice image-processing capabilities, but the APIs are wildly inconsistent. Plus, some third party libraries want a canvas, others want an image. And if you need to read an image in, you need to know the intimacies of the [File](https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications) and [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) APIs.

Usage
-----

Accept an image File via an `<input>` tag, and append it to the document as an Image.

```js
var jug = require('image-juggler');

var img = document.createElement('img');

var input = document.querySelector('input[type="file"]');
input.addEventListener('change', function(e) {
  e.stopPropagation();
  var file = e.target.files[0];

  if (!file) {
    throw new Error('No file or invalid file was selected');
  }

  jug.fileToImage(file, img, function(err, img) {
    document.body.appendChild(img);
  })
}, false)
```


API
---

Each of the functions follow the format of `function(input, opt_output, callback)`, where:

- `input`: the thing coming in...
- `opt_output`: if part of the signature, this element is used as the target container of the transform operation. For example, `imageToCanvas(image, opt_canvas, cb)` will use `opt_canvas`, but if none is passed in it will create a new `<canvas>` and supply it to the `callback`. Supplying an existing element can help to avoid GC. Some operations, due to the underlying implementation, require a new object to be created regardless (such as ArrayBuffers).
- `callback`: Always of the signature: `function(error, result)`, even if the underlying operation is not asynchronous. __NOTE: There is no guarantee that `callback` will be called asynchronously. Yes. This releases Zalgo.__

### imageToCanvas(image, opt_canvas, cb)

### imageToArrayBuffer(image, cb)

### imageDataToImage(imageData, opt_image, cb)

### fileToArrayBuffer(file, cb)

### fileToImage(file, opt_image, cb)

### canvasToImage(canvas, opt_image, cb)

### blobToImage(blob, opt_image, cb)

