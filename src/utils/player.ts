import type VimeoPlayer from "@vimeo/player";

export class UniversalPlayer {
  private vimeoPlayer: VimeoPlayer | null = null;
  private ytPlayer: any = null;
  private listener: any;
  constructor(public video: string | number, public el: HTMLElement, public type: "youtube" | "vimeo") {}

  private async setupPlayer() {
    if (this.type === "youtube") {
      const YouTubePlayer = (await import("youtube-player")).default;
      this.ytPlayer = YouTubePlayer(this.el);
      this.ytPlayer.cueVideoById(this.video as string);
    } else {
      const VimeoPlayer = (await import("@vimeo/player")).default;
      this.vimeoPlayer = new VimeoPlayer(this.el, { id: this.video as number });
    }
  }

  // Static constructor to await dynamic imports
  static async create(video: string | number, el: HTMLElement, type: "youtube" | "vimeo") {
    const obj = new UniversalPlayer(video, el, type);
    await obj.setupPlayer();
    return obj;
  }

  play() {
    if (this.type === "youtube") {
      this.ytPlayer.playVideo();
    } else {
      this.vimeoPlayer!.play();
    }
  }

  destroy() {
    if (this.type === "youtube") {
      this.ytPlayer.off(this.listener);
      this.ytPlayer.destroy();
    } else {
      this.vimeoPlayer!.off("ended");
      this.vimeoPlayer!.destroy();
    }
  }

  onEnded(cb: () => void) {
    if (this.type === "youtube") {
      return (this.listener = this.ytPlayer.on("stateChange", (event: any) => {
        if (event.data === 0) cb();
      }));
    }

    this.listener = this.vimeoPlayer!.on("ended", cb);
  }
}
