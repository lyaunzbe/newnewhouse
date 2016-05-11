import {
  polyfill
}
from 'es6-promise'
polyfill()


import THREE from 'three'
import domready from 'domready'
import viewer from './src/viewer'
import loadGeometry from './src/load-json-model'
import loadTexture from './src/load-texture'
import assign from 'object-assign'
import findMedia from './src/find-media'
import loadVideo from './src/load-video'
import CanvasTex from './src/add-canvas-tex'

domready(() => {
  // let p5tex = new p5Tex();
  // p5tex.init();
  // let ctex = new CanvasTex();
  // ctex.init();


  assign(document.body.style, {
    background: 'transparent',
    overflow: 'hidden',
    margin: 0
  })

  const app = viewer({
    alpha: true,
    preserveDrawingBuffer: false,
    antialias: true
  }, null);

  app.start();


  // findMedia().then((media) =>{
  //   loadVideo(media.images.original.mp4).then((vid) =>{
  //
  //   })
  //   // console.log(media);
  //
  // })

  // addBackground(app, vid);
  // app.controls.enabled = true;

})
