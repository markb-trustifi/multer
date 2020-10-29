// var concat = require('concat-stream')

function MemoryStorage (opts) {}

MemoryStorage.prototype._handleFile = function _handleFile (req, file, cb) {
  /* file.stream.pipe(concat({ encoding: 'buffer' }, function (data) {
    cb(null, {
      buffer: data,
      size: data.length
    })
  })) */

  var chunks = []
  var error = null
  file.stream.on('data', chunk => chunks.push(chunk))
  file.stream.on('error', err => { error = err })
  file.stream.on('end', () => {
    chunks = Buffer.concat(chunks)
    cb(error, {
      buffer: chunks,
      size: chunks.length
    })
  })
}

MemoryStorage.prototype._removeFile = function _removeFile (req, file, cb) {
  delete file.buffer
  cb(null)
}

module.exports = function (opts) {
  return new MemoryStorage(opts)
}
