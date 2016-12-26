(function (root) {

  function BackgroundCover(el, container, hAlign, vAlign) {

    hAlign = (hAlign !== undefined) ? hAlign : 0.5;
    vAlign = (vAlign !== undefined) ? vAlign : 0.5;

    var elAspect, elWidth, elHeight, elPosTop, elPosLeft;

    var w = container.clientWidth;
    var h = container.clientHeight;
    var contAspect = w / h;

    if (el instanceof HTMLVideoElement) {
      elAspect = el.videoWidth / el.videoHeight;
    } else if (el instanceof HTMLImageElement) {
      elAspect = (el.naturalWidth !== undefined) ? (el.naturalWidth / el.naturalHeight) : (el.width / el.height);
    } else {
      elAspect = el.clientWidth / el.clientHeight;
    }

    if (contAspect > elAspect) {
      elWidth = w;
      elHeight = w / elAspect;
      elPosTop = -(elHeight - h) * vAlign;
      elPosLeft = 0;
    } else {
      elWidth = h * elAspect;
      elHeight = h;
      elPosTop = 0;
      elPosLeft = -(elWidth - w) * hAlign;
    }

    container.style.overflow = 'hidden';

    el.style.position = 'absolute';
    el.width = elWidth;
    el.height = elHeight;
    el.style.width = elWidth + 'px';
    el.style.height = elHeight + 'px';
    el.style.top = elPosTop + 'px';
    el.style.left = elPosLeft + 'px';

    return {
      elWidth: elWidth,
      elHeight: elHeight,
      elPosTop: elPosTop,
      elPosLeft: elPosLeft,
    }
  }

  if ('module' in root && 'exports' in module) {
    module.exports = BackgroundCover;
  } else {
    root.BackgroundCover = BackgroundCover;
  }

})(this);