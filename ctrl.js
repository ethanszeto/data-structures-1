class Probability {
  static variance(list) {
    if (list.length == 1 || list.length == 0) {
      return 0;
    }

    var mean = Probability.average(list);
    var varNum = 0;

    for (let i = 0; i < list.length; i++) {
      varNum += Math.pow(list[i] - mean, 2);
    }

    return varNum / (list.length - 1);
  }

  static average(list) {
    var total = 0;
    for (let i = 0; i < list.length; i++) {
      total += list[i];
    }
    return total / list.length;
  }

  static rand() {
    return Math.floor(Math.random() * 2);
  }
}

class Rect {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Word {
  constructor(text, color, font, x, y) {
    this.text = text;
    this.color = color;
    this.font = font;
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
  }
}
