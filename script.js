const $button = document.querySelector('button')
$button.addEventListener('click', async () => {
  const media = await navigator.mediaDevices.getDisplayMedia({
    audio:true,
    video:true
  })
  const mediarecorder = new MediaRecorder(
    media,
    {mimeType:'video/mp4;codecs="avc1.424028, mp4a.40.2"'}
    )
  mediarecorder.start()


  const [video] = media.getVideoTracks()
  video.addEventListener("ended", () => {
    mediarecorder.stop()
  })

  mediarecorder.addEventListener("dataavailable", (e) => {
    const link = document.createElement("a")
    link.href = URL.createObjectURL(e.data)
    link.download = "captura.mp4"
    link.click()
  })
})