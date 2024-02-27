const $button = document.querySelector('button')

$button.addEventListener('click', async () => {
  const media = await navigator.mediaDevices.getDisplayMedia({
    audio:true,
    video: { frameRate: { ideal: 30 } }
  })
  
  const type_video_format = ['video/webm;codecs="vp9.02.10.10.01.09.16.09.01,opus"']

  const media_recorder = new MediaRecorder(media, {
    mimeType:type_video_format,
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
