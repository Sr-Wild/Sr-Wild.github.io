const $button = document.querySelector('button')
$button.addEventListener('click', async () => {
  const media = await navigator.mediaDevices.getDisplayMedia({
    audio:true,
    video:true
  })
  const media_recorder = new MediaRecorder(
    media,
    {
      mimeType:'video/mp4;codecs=avc1.424028,mp4a.40.2',
    }
    )
  media_recorder.start()
  const file_aud = media.getVideoTracks()
  file_aud.addEventListener("ended", () => {
    mediarecorder.stop()
  })

  media_recorder.addEventListener("dataavailable", (e) => {
    const link = document.createElement("a")
    link.href = URL.createObjectURL(e.data)
    link.download = "captura.mp4"
    link.click()
  })
  setInterval()
})