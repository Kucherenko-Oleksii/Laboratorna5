class Canvas {
  constructor(canvasId) {
    this.canvas = document.querySelector(`#${canvasId}`);
    this.ctx = this.canvas.getContext("2d");
    this.shapes = [];

    this.resizeCanvas();
    window.addEventListener("resize", () => this.onWindowResize());

    this.canvas.addEventListener("mousemove", (event) => {
      const { offsetX: x, offsetY: y } = event;
      this.drawMousePosition(x, y);
    });

    this.canvas.addEventListener("mousedown", (event) => {
      const { offsetX: x, offsetY: y, button } = event;
      if (button === 0) {
        this.addRandomShape(x, y);
      } else if (button === 2) {
        this.clearCanvas();
      }
    });

    this.canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault(); 
    });
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.drawShapes();
    this.addRandomShapeAfterResize();
  }

  onWindowResize() {
    this.resizeCanvas();
  }

  addRandomShape(x, y) {
    const color = this.getRandomColor();
    const size = Math.floor(Math.random() * 50) + 10;
    this.shapes.push({ x, y, color, size });
    this.drawShapes();
  }

  addRandomShapeAfterResize() {
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      this.addRandomShape(x, y);
    }
  }

  clearCanvas() {
    this.shapes = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawShapes() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.shapes.forEach((shape) => {
      this.ctx.beginPath();
      this.ctx.arc(shape.x, shape.y, shape.size, 0, 2 * Math.PI);
      this.ctx.fillStyle = shape.color;
      this.ctx.fill();
    });
  }

  drawMousePosition(x, y) {
    this.ctx.clearRect(0, 0, 200, 30);
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(`Mouse: (${x}, ${y})`, 10, 20);
  }

  getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

const canvas = new Canvas("myCanvas");
