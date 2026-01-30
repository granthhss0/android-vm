const video = document.getElementById("stream");
const startBtn = document.getElementById("start");

let pc;

startBtn.onclick = async () => {
  pc = new RTCPeerConnection();

  pc.ontrack = e => {
    video.srcObject = e.streams[0];
  };

  const res = await fetch("/offer");
  const offer = await res.json();

  await pc.setRemoteDescription(offer);
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  await fetch("/answer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answer)
  });
};
