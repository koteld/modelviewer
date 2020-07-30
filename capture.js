const width = 240;
const height = 320;

let canvas = document.getElementById('canvas');
let photo = document.getElementById('photo');
let startbutton = document.getElementById('startbutton');

let video = document.getElementById('video');

const constraints = {
  video: {
    facingMode: 'environment',
    deviceId: { exact: '' }
  },
  audio: false
};

navigator.mediaDevices
  .getUserMedia(constraints)
  .then(stream => {
    video.srcObject = stream;
  });

const clearphoto = () => {
  const context = canvas.getContext('2d');
  context.fillStyle = "#AAA";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
};

const takepicture = () => {
  const modelviewer = document.getElementById('model');
  const context = canvas.getContext('2d');

  const shadow = modelviewer.shadowRoot;
  const modelCanvas = shadow.getElementById('webgl-canvas');

  const imageObj = new Image();
  imageObj.src = modelCanvas.toDataURL('image/png');

  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    const videoHeight = video.videoHeight / (video.videoWidth/width);
    context.drawImage(video, 0, height/2 - videoHeight/2, width, videoHeight);
    context.drawImage(imageObj, width/2 - 25, height/2 - 25, 50, 50);

    const data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  } else {
    clearphoto();
  }
};

function subscribe(event, element, func) {
  if (element.addEventListener) {
    element.addEventListener(event, func, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + event, func);
  } else {
    element['on' + event] = func;
  }
}

clearphoto();
subscribe('click', startbutton, takepicture);
