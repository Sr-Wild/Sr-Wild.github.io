const $button = document.querySelector('button')

const option  = {
    audioBitsPerSecond:2500000,
    videoBitsPerSecond:2500000
}
const setting = {
    audio:true,
    video: { frameRate: { ideal: 30 } }
}
const video_format={type:"video/mp4"}
const recorded_Chunks = [];

$button.addEventListener('click', async () => {
  const media = await navigator.mediaDevices.getDisplayMedia(setting)
  const media_recorder = new MediaRecorder(media,option)
  media_recorder.ondataavailable = handle_data_available;
  media_recorder.start()

  function handle_data_available(event) {
    if (event.data.size > 0) {
      recorded_Chunks.push(event.data);
      download();
    } else {
    }
  }
  function download() {
    const blob = new Blob(recorded_Chunks,video_format);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "test";
    a.click();
    window.URL.revokeObjectURL(url);
  }
  const [video] = media.getVideoTracks()
  video.addEventListener("ended", () => {
    media_recorder.stop()
  })
})
