export class GameToRenderSizeConverter {
  private renderLength: number = 0;

  constructor(renderLength?: number) {
    if (typeof renderLength !== 'undefined') {
      this.setRenderLength(renderLength);
    }
  }

  public setRenderLength(renderLength: number): void {
    this.renderLength = renderLength;
  }

  public size(gameSize: number): number {
    return gameSize * this.renderLength;
  }
}
