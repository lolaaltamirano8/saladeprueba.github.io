// gesture.js
function setupGestures(camera, renderer, flower) {
  const hammer = new Hammer(renderer.domElement);
  const gestures = new THREE.GestureHandler(camera, renderer.domElement);

  hammer.get('pinch').set({
    enable: true
  });

  hammer.on('pinchstart', function (event) {
    // Puedes realizar acciones adicionales cuando comienza el gesto de pellizco.
  });

  hammer.on('pinch', function (event) {
    if (flower) {
      // Escala el modelo en función del gesto de pellizco.
      flower.scale.set(event.scale, event.scale, event.scale);
    }
  });

  gestures.addEventListener('pinchstart', function (event) {
    // Puedes realizar acciones adicionales cuando comienza el gesto de pellizco.
  });

  gestures.addEventListener('pinchmove', function (event) {
    if (flower) {
      // Escala el modelo en función del gesto de pellizco.
      flower.scale.set(event.scale, event.scale, event.scale);
    }
  });
}
