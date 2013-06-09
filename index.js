/**
 * Simple white noise generator, inspired by Nick Thompson's
 * post on Script Processors (https://medium.com/web-audio/61a836e28b42)
 *
 * @param {AudioContext} context
 * @param {object} opts
 * @param {boolean} opts.stereo
 * @param {number} opts.bufferSize
 * @param {number} opts.channels
 */

function WhiteNoise (context, opts) {
  // Defaults
  opts = opts || {};
  var p = this.meta.params;
  this._stereo = opts.stereo != null ? !!opts.stereo : !!this.meta.params.stereo.defaultValue;
  this._bufferSize = opts.bufferSize || this.meta.params.bufferSize.defaultValue;
  this._channels = opts.channels || this.meta.params.channels.defaultValue;
  this._context = context;

  var node = context.createBufferSource();
  this.source = this.output = node;

  node.loop = true;
  buildBuffer(this);
}

function buildBuffer (module) {
  var buffer = module._context.createBuffer(module.channels, module.bufferSize, module._context.sampleRate);
  var rand;
  for (var i = 0; i < module.bufferSize; i++) {
    rand = Math.random() * 2 - 1;
    for (var j = 0; j < module.channels; j++) {
      buffer.getChannelData(j)[i] = module.stereo ? Math.random() * 2 - 1 : rand;
    }
  }
  module.source.buffer = buffer;
}

WhiteNoise.prototype = Object.create(null, {

  connect: {
    value: function (dest) {
      this.output.connect( dest.input ? dest.input : dest );
    }
  },

  disconnect: {
    value: function () {
      this.output.disconnect();
    }
  },

  start: {
    value: function () {
      var fn = this.source.start ? this.source.start : this.source.noteOn;
      buildBuffer(this);
      fn.apply(this.source, Array.slice(arguments));
    }
  },
  
  stop: {
    value: function () {
      var fn = this.source.stop ? this.source.stop : this.source.noteOff;
      fn.apply(this.source, Array.slice(arguments));
    }
  },

  /**
   * Module parameter metadata.
   */

  meta: {
    value: {
      name: "white-noise",
      type: "generator",
      params: {
        stereo: {
          min: 0,
          max: 1,
          defaultValue: 1,
          type: "bool"
        },
        bufferSize: {
          values: [128, 256, 512, 1024, 2048, 4096, 8192, 16384],
          defaultValue: 4096,
          type: "enum"
        },
        channels: {
          min: 1,
          max: 32,
          defaultValue: 2,
          type: "int"
        }
      }
    }
  },

  /**
   * Public parameters.
   */

  stereo: {
    enumerable: true,
    get: function () { return this._stereo; },
    set: function (value) {
      this._stereo = !!value;
      buildBuffer(this);
    }
  },

  bufferSize: {
    enumerable: true,
    get: function () { return this._bufferSize; },
    set: function (value) {
      this._bufferSize = ~this.meta.params.bufferSize.values.indexOf(value)
        ? value
        : this.meta.params.bufferSize.defaultValue;
      buildBuffer(this);
    }
  },

  channels: {
    enumerable: true,
    get: function () { return this._channels; },
    set: function (value) {
      this._channels = value;
      buildBuffer(this);
    }
  }
  

});

/**
 * Exports.
 */

module.exports = WhiteNoise;
