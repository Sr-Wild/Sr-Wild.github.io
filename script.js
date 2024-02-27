const $button = document.querySelector('button')

const option  = {
    mimeType:'video/webm;codecs=vp9,opus',
    audioBitsPerSecond:2500000,
    videoBitsPerSecond:2500000
}
const setting = {
    audio:true,
    video: { frameRate: { ideal: 30 } }
}
const recorded_Chunks = [];

$button.addEventListener('click', async () => {
  const media = await navigator.mediaDevices.getDisplayMedia(setting)
  const media_recorder = new MediaRecorder(media,option)
  media_recorder.ondataavailable = handleDataAvailable;
  media_recorder.start()

  function handleDataAvailable(event) {
    if (event.data.size > 0) {
      recorded_Chunks.push(event.data);
      download();
    } else {
    }
  }
  function download() {
    const blob = new Blob(recorded_Chunks, {
      type: "video/webm",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "test";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  /* media_recorder.addEventListener("dataavailable", (e) => {
    const link = document.createElement("a")
    link.href = URL.createObjectURL(e.data)
    link.download = "captura"
    link.click()
  }) */
  const [video] = media.getVideoTracks()
  video.addEventListener("ended", () => {
    media_recorder.stop()
  })
})
