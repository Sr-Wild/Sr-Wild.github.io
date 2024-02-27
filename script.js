const $button = document.querySelector('button')

$button.addEventListener('click', async () => {
  const media = await navigator.mediaDevices.getDisplayMedia({
    audio:true,
    video: { frameRate: { ideal: 30 } }
  })
  
  const media_recorder = new MediaRecorder(media, {
    mimeType:'video/webm;codecs=vp9,opus',
    audioBitsPerSecond:128000,
    videoBitsPerSecond:2500000
  })
  media_recorder.start()

  const [video] = media.getVideoTracks()
  video.addEventListener("ended", () => {
    media_recorder.stop()
  })
  media_recorder.addEventListener("dataavailable", (e) => {
    const link = document.createElement("a")
    link.href = URL.createObjectURL(e.data)
    link.download = "captura"
    link.click()
  })
})
