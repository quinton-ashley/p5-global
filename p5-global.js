window.P2D = 'p2d';
window.P2DHDR = 'p2d-hdr';
window.WEBGPU = 'webgpu';
window.WEBGL = 'webgl';
window.windowWidth = window.innerWidth;
window.windowHeight = window.innerHeight;

const runHook = p5.prototype._runLifecycleHook;
p5.prototype._runLifecycleHook = async function (hookName) {
	if (hookName == 'postsetup') return;
	if (hookName == 'predraw' && !this._ranPostsetup) {
		await runHook.call(this, 'postsetup');
		this._ranPostsetup = true;
	}
	return runHook.call(this, hookName);
};

window.Canvas = (...args) => {
	return new Promise((resolve) => {
		window.setup = async function () {
			const $ = p5.instance;

			const entryPoints = [
				'setup',
				'update',
				'draw',
				'deviceMoved',
				'deviceTurned',
				'deviceShaken',
				'doubleClicked',
				'mousePressed',
				'mouseReleased',
				'mouseMoved',
				'mouseDragged',
				'mouseClicked',
				'mouseWheel',
				'touchStarted',
				'touchMoved',
				'touchEnded',
				'keyPressed',
				'keyReleased',
				'keyTyped',
				'windowResized'
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
					configurable: true
				});
			}

			let r = $.createCanvas(...args);
			if (r instanceof Promise) r = await r;
			resolve(r);
		};
	});
};
