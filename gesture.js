// gesture.js
let initialScale = 1;

function handlePinch(event) {
  if (flower) {
    flower.scale.set(initialScale * event.scale, initialScale * event.scale, initialScale * event.scale);
  }
}

function setupGestures(camera, renderer) {
  const hammer = new Hammer(renderer.domElement);
  const gestures = new THREE.GestureHandler(camera, renderer.domElement);

  hammer.get('pinch').set({
    enable: true
  });

  hammer.on('pinchstart', function (event) {
    initialScale = flower ? flower.scale.x : 1;
  });

  hammer.on('pinch', handlePinch);

  gestures.addEventListener('pinchstart', function (event) {
    initialScale = flower ? flower.scale.x : 1;
  });

  gestures.addEventListener('pinchmove', handlePinch);
}

// Additional code for other gestures can be added here if needed

