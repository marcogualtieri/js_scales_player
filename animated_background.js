var BackgroundParticles = BackgroundParticles || {};

(function (out) {

	function getParticleColor() {
		var colors = ['rgba(50,60,70,0.15)', 'rgba(255,255,255,0.2)']; // black and white
		return colors[Math.floor(Math.random() * colors.length)];
	}

	var Particle = function() {
		// random initial position
		this.x = Math.random() * window.innerWidth;
		this.y = Math.random() * window.innerHeight;
		// random velocity
		this.vx = -1 + 1 * Math.random();
		this.vy = -1 + 1 * Math.random();
		// shape
		this.radius = 4;
		this.color = getParticleColor();
		this.blur = Math.floor(-7 * Math.random() + 9) / 10;

		this.draw = function(context, maxWidth, maxHeight) {
			context.beginPath();	
			context.fillStyle = this.color;
			context.arc(this.x, this.y, this.radius, 0, Math.PI * this.radius, !1);
			context.fill();
			// move particle using velocity
			this.x += this.vx;
			this.y += this.vy;
			// prevent particles from moving out of the canvas
			if(this.x < -50) this.x = maxWidth + 50;
			if(this.y < -50) this.y = maxHeight + 50;
			if(this.x > maxWidth + 50) this.x = -50;
			if(this.y > maxHeight + 50) this.y = -50;
		}		
	};

	var init = function (canvas) {
		this.canvas = canvas;
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		window.onresize = function(event) {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		var context = this.canvas.getContext("2d");
		context.globalCompositeOperation = "lighter";

		var particles = [];
		for(var i=0; i<50; i++) {
			particles.push(new Particle());
		}

		function animateParticles() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			for(var i=0; i<particles.length; i++) {
				particles[i].draw(context, canvas.width, canvas.height);
			}
		}

		setInterval(animateParticles, 1000 / 60);
	};

	out.init = init;
	
}(BackgroundParticles));