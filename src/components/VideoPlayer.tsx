// This is just a normal Video Player that uses the HTML5
// <video /> element and works as a server-only component. For actual
// use in courses that have pay-walls, their is also a <VimeoPlayer /> && <YoutubePlayer />
interface Props {
  src: string;
  className: string;
  previewImgUrl?: string;
  captionSrc?: string;
}

export default function VideoPlayer({ src, previewImgUrl, captionSrc, className }: Props) {
  return (
    <video
      src={src}
      poster={previewImgUrl}
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload noplaybackrate"
      className={`aspect-video ${className}`}
      controls
    >
      <track src={captionSrc} kind="captions" label="English" />
    </video>
  );
}
