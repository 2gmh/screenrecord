let mediaRecorder, recordedChunks = [];

document.getElementById('startBtn').onclick = async () => {
  const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  mediaRecorder = new MediaRecorder(stream);
  
  mediaRecorder.ondataavailable = e => e.data.size > 0 && recordedChunks.push(e.data);
  mediaRecorder.onstop = () => {
    const url = URL.createObjectURL(new Blob(recordedChunks, { type: 'video/webm' }));
    document.getElementById('preview').src = url;
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grabacion.webm';
    a.click();
  };
  
  mediaRecorder.start();
  document.getElementById('startBtn').disabled = true;
  document.getElementById('stopBtn').disabled = false;
};

document.getElementById('stopBtn').onclick = () => {
  mediaRecorder.stop();
  document.getElementById('startBtn').disabled = false;
  document.getElementById('stopBtn').disabled = true;
};
