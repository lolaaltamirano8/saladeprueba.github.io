// gesture.js
let initialScale = 1;
const hammer = new Hammer(document.body);

hammer.get('pinch').set({
  enable: true
});

hammer.on('pinchstart', function (event) {
  initialScale = flower ? flower.scale.x : 1;
});

hammer.on('pinch', function (event) {
  if (flower) {
    flower.scale.set(initialScale * event.scale, initialScale * event.scale, initialScale * event.scale);
  }
});
