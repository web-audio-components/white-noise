
# White Noise

  A simple white noise generator module for the Web Audio API.

## Installation

    $ component install web-audio-components/white-noise

## Example Usage

```javascript
var context = new (AudioContext ||webkitAudioContext)()
  , Noise = require("white-noise")
  , noise = new Noise(context, {
      channels: 2,
      bufferSize: 4096,
      stereo: true
    });

noise.connect(context.destination);
noise.start(0);
```

For further examples, see the example.

## API

### WhiteNoise(context, options)

Instantiate a white-noise effect module. Expects an `AudioContext` as the first
parameter.

**Options**

- `channels` Number of channels (default: `2`)
- `stereo` Boolean of whether or not each channel should be unique (default: `true`)
- `bufferSize` Size of the generated buffer (128, 256, 512, 1024, 2048, 4096, 8192, 16384 are the only allowed values) (default: `4096`)

### .connect(node)

Connect a WhiteNoise module to an `AudioNode`.

### .disconnect()

Disconnect all outgoing connections from a WhiteNoise module.

### .start(when, [offset, duration])

Starts emitting audio; recreates the buffer and proxies the [buffer source node's `start` method](http://www.w3.org/TR/webaudio/#AudioBufferSourceNode-section).

### .stop(when)
Schedules a sound to stop playback at an exact time; proxies the [buffer source node's `stop` method](http://www.w3.org/TR/webaudio/#AudioBufferSourceNode-section).

## License

  Copyright (c) 2012 Nick Thompson

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
