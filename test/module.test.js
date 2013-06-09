var Module   = require('white-noise');
var allen    = require('jsantell-allen/allen.js');
var ctx      = allen.getAudioContext();
var gainNode = ctx.createGainNode();

describe('Audio Component Spec', function () {
  
  beforeEach(function () {
    this.module = new Module(ctx);
  });

  describe('constructor', function () {
    it('returns an instance upon instantiation', function () {
      expect(this.module).to.be.instanceOf(Module);
    });
  });

  describe('properties', function () {
    it('has a source property which is an Audio Source Node', function () {
      expect(allen.isAudioSource(this.module.source)).to.be.ok;
    });
    it('has an output property which is an Audio Node', function () {
      expect(allen.isAudioNode(this.module.output)).to.be.ok;
    });
    it('has meta property with a name', function () {
      expect(this.module.meta.name).to.be.ok;
    });
    it('has meta property with params property', function () {
      expect(this.module.meta.params).to.be.ok;
    });
  });

  describe('connect', function () {
    it('has a method connect that takes an AudioNode', function () {
      var that = this;
      expect(connect).to.not.throw();
      function connect () {
        that.module.connect(gainNode);
      }
    });
  });

  describe('disconnect', function () {
    it('has a method disconnect', function () {
      var that = this;
      this.module.connect(gainNode);
      expect(disconnect).to.not.throw();
      function disconnect () {
        that.module.disconnect();
      }
    });
  });
});
