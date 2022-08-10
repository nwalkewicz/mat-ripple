import Ripple from './Ripple.js';

function readyToRemove(e, ripple) {
	if (!ripple) return;
	if (!e.target.closest('[ripple]')) return false;
	return ripple.readyToRemove = true;
}

let ripple;

document.body.addEventListener('pointerdown', e => {
	// Only use ripple targets.
	if (e.target.getAttribute('ripple') === null) return;
	const target = e.target.closest('[ripple]');
	
	// Set position.
	const rData = {
		position: {
			x: e.layerX,
			y: e.layerY
		}
	};

	// Set color.
	rData.color = target.getAttribute('ripple-color') || undefined;

	// Handle icons.
	if (target.getAttribute('ripple-icon') !== null) {
		rData.position = {
			x: target.offsetWidth / 2,
			y: target.offsetHeight / 2
		};
		rData.size = Math.max.apply(null, [target.offsetWidth, target.offsetHeight]) * 1.25;
		rData.timeout = 200;
		return ripple = new Ripple({target: target, ...rData});
	};

	// Calculate pixel offset from center of element.
	const offsetX = Math.abs((target.offsetWidth / 2) - rData.position.x);
	const offsetY = Math.abs((target.offsetHeight / 2) - rData.position.y);
	const offsetH = Math.hypot(offsetX, offsetY);

	// Set size based on element hypotenuse & pixel offset.
	rData.size = Math.hypot(target.offsetWidth, target.offsetHeight) + (offsetH * 2);

	// Create ripple
	ripple = new Ripple({target: target, ...rData});
});

document.body.addEventListener('pointerup', e => readyToRemove(e, ripple));
document.body.addEventListener('pointerleave', e => readyToRemove(e, ripple), {capture: true});
