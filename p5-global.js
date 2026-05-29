
window.P2D = 'p2d';
window.P2D_HDR = 'p2d-hdr';
window.WEBGPU = 'webgpu';
window.WEBGL = 'webgl';
window.windowWidth = 'windowWidth';
window.windowHeight = 'windowHeight';

window.Canvas = (...args) => {
  return new Promise((resolve) => {
    window.setup = async function () {
      const $ = p5.instance;

      const entryPoints = [
        "setup",
        "update",
        "draw",
        "deviceMoved",
        "deviceTurned",
        "deviceShaken",
        "doubleClicked",
        "mousePressed",
        "mouseReleased",
        "mouseMoved",
        "mouseDragged",
        "mouseClicked",
        "mouseWheel",
        "touchStarted",
        "touchMoved",
        "touchEnded",
        "keyPressed",
        "keyReleased",
        "keyTyped",
        "windowResized",
      ];

      for (let ep of entryPoints) {
        Object.defineProperty(p5, ep, {
          set(fn) {
            $[ep] = fn;
            if ($._isGlobal) window[ep] = fn;
          },
          get() {
            return $[ep];
          },
          configurable: true,
        });
      }
      
      let r = $.createCanvas(....map((arg) => {
        if (arg == 'windowWidth') return windowWidth;
        if (arg == 'windowHeight') return windowHeight;
        return arg;
      }));
      if (r instanceof Promise) r = await r;
      resolve(r);
    };
  });
};

const runLifecycleHook = p5.prototype._runLifecycleHook;
p5.prototype.isFirstDraw = true;
p5.prototype._runLifecycleHook = async function(hookName) {
  if (hookName === 'postsetup') {
    return;
  } else if (hookName === 'predraw' && this.isFirstDraw) {
    await runLifecycleHook.call(this, 'postsetup');
    this.isFirstDraw = false;
  }
  return runLifecycleHook.call(this, hookName);
}
