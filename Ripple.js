const DEFAULT_OPTIONS = {
	size: 100,
	position: {
		x: 0,
		y: 0
	},
	timeout: 500
}

class Ripple {
	#rippleElem;
	#activeSince;
	#removeBinded;
	#readyToRemove;
	
	/**
	 * @param {Object} options
	 * @param {HTMLElement} options.target
	 */
	constructor(options) {
		this.#rippleElem = document.createElement('div');
		this.#rippleElem.classList.add('rippleElem');
		this.#activeSince = new Date();
		this.#removeBinded = this.#remove.bind(this);
		this.#initializeStyles();
		requestAnimationFrame(() => this.#rippleElem.classList.add('show'));
		if (!options.color) delete options.color;
		this.#update({...DEFAULT_OPTIONS, ...options});
		setTimeout(this.#removeBinded, this.timeout);
	}

	set target(target) {
		target.append(this.#rippleElem);
	}

	set size(value) {
		this.#rippleElem.style.width = value;
		this.#rippleElem.style.height = value;
	}

	set position({x, y}) {
		this.#rippleElem.style.left = x;
		this.#rippleElem.style.top = y;
	}

	set readyToRemove(value) {
		this.#readyToRemove = value;
		if (!value) return;
		if (new Date() - this.#activeSince >= this.timeout) this.#removeBinded();
	}

	get readyToRemove() {
		return this.#readyToRemove;
	}

	#initializeStyles() {
	}

	#update(options) {
		options.position.x = options.position.x - (options.size / 2);
		options.position.y = options.position.y - (options.size / 2);
		options.position.x += 'px';
		options.position.y += 'px';
		options.size += 'px';
		Object.entries(options).forEach(([key, val]) => this[key] = val);
	}

	#remove() {
		if (!this.readyToRemove) return;
		this.#rippleElem.classList.add('fadeOut');
		this.#rippleElem.addEventListener('transitionend', e => {
			if (e.propertyName !== 'opacity') return;
			this.#rippleElem.remove();
		});
	}
}

export default Ripple;
