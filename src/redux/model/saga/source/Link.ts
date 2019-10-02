class Link {
  public up: number;
  public down: number;

  constructor({ up, down }: Link) {
    this.up = up;
    this.down = down;
  }
}

export default Link;
