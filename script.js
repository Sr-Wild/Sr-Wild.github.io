const $button = document.querySelector('button')

$button.addEventListener('click', async () => {
  const media = await navigator.mediaDevices.getDisplayMedia({
    audio:true,
    video: { frameRate: { ideal: 60 } }
  })
  const type = 
  [
    'video/webm;codecs="vp09.02.10.10.01.09.16.09.01,opus"'
  ]

  const mediarecorder = new MediaRecorder(media, {
    mimeType:type,
    audioBitsPerSecond:128000,
    videoBitsPerSecond:2500000
  })
  mediarecorder.start()

  const [video] = media.getVideoTracks()
  video.addEventListener("ended", () => {
    mediarecorder.stop()
  })

  mediarecorder.addEventListener("dataavailable", (e) => {
    const link = document.createElement("a")
    link.href = URL.createObjectURL(e.data)
    link.download = "captura.webm"
    link.click()
  })
})
