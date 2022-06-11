import Ripple from './Ripple.js';

const rTargets = document.querySelectorAll('[ripple]');
	
function readyToRemove(e, ripple) {
	if (!ripple) return;
	if (e.target.getAttribute('ripple') === null) return false;
	return ripple.readyToRemove = true;
}

rTargets.forEach(target => {
	let ripple;
	
	target.addEventListener('pointerdown', e => {
		// Filter out child elements
		if (e.target.getAttribute('ripple') === null) return;

		// Set position
		const rData = {
			position: {
				x: e.layerX,
				y: e.layerY
			}
		}
		
		// Set color
		rData.color = e.target.getAttribute('ripple-color') || undefined;
    
		// Handle icons
		if (e.target.getAttribute('ripple-icon') !== null) {
			rData.position = {x:e.target.offsetWidth / 2,y:e.target.offsetHeight / 2}
			rData.size = Math.max.apply(null, [e.target.offsetWidth, e.target.offsetHeight]) * 1.25;
			rData.timeout = 200;
			return ripple = new Ripple({target, ...rData});
		};
		
		// Calculate pixel offset from center of element
		const offsetX = Math.abs((e.target.offsetWidth / 2) - rData.position.x);
		const offsetY = Math.abs((e.target.offsetHeight / 2) - rData.position.y);
		const offsetH = Math.hypot(offsetX, offsetY);
		
		// Set size based on element hypotenuse & pixel offset
		rData.size = Math.hypot(e.target.offsetWidth, e.target.offsetHeight) + (offsetH * 2);
    
		// Create ripple
		ripple = new Ripple({target, ...rData});
	});

	target.addEventListener('pointerup', e => readyToRemove(e, ripple));
	target.addEventListener('pointerleave', e => readyToRemove(e, ripple));
});
