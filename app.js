
let canvas;
let ctx;
let webcamStream;
let video;
let selectedFilter = 'none'; // Initialize the selected filter

const constraints = {
  video: true,
  audio: false
};

const init = function () {
  canvas = document.getElementById('myCanvas');
  ctx = canvas.getContext('2d');
};

const startWebcam = async function () {
  try {
    if (!webcamStream) {
      webcamStream = await navigator.mediaDevices.getUserMedia(constraints);
      video = document.getElementById('myVideo');
    }

    if (typeof video.srcObject !== 'undefined') {
      video.srcObject = webcamStream;
    } else {
      video.src = URL.createObjectURL(webcamStream);
    }

    video.play();
  } catch (err) {
    console.error('Error obtaining navigator.mediaDevices.getUserMedia');
    console.error(err.message || err);
    console.error('https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Browser_compatibility');
  }
};

const stopWebcam = function () {
  if (video && video.srcObject) {
    const videoTracks = webcamStream.getVideoTracks();
    videoTracks.forEach(track => {
      track.stop();
    });

    if (typeof video.srcObject !== 'undefined') {
      video.srcObject = null;
    } else {
      video.src = null;
    }

    webcamStream = null;
  }
};

const takeSnapshot = function () {
  if (webcamStream) {
    // Apply the selected filter
    applySelectedFilter();
    // Draw the current image from the video onto the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Create a download link for the snapshot
    createDownloadLink();
  }
};

const pauseVideo = function () {
  if (video) {
    video.pause();
  }
};

const resumeVideo = function () {
  if (video) {
    video.play();
  }
};

const toggleMirror = function () {
  const checked = document.getElementById('mirrorCheckbox').checked;
  video.className = checked ? 'mirror' : '';
  canvas.className = checked ? 'mirror' : '';
};

const applySelectedFilter = function () {
  // Apply the selected filter to the canvas context
  ctx.filter = selectedFilter;
};




const createDownloadLink = function () {
  const snapshotDataUrl = canvas.toDataURL('image/png');
  const downloadLink = document.getElementById('downloadLink');
  downloadLink.href = snapshotDataUrl;
  downloadLink.style.display = 'block';
};









init();

















