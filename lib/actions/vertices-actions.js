"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beginDraggingVertex = beginDraggingVertex;
exports.endDraggingVertex = endDraggingVertex;
exports.updateDraggingVertex = updateDraggingVertex;
var _constants = require("../utils/constants");
function beginDraggingVertex(layerID, vertexID, x, y, snapMask) {
  return {
    type: _constants.BEGIN_DRAGGING_VERTEX,
    layerID: layerID,
    vertexID: vertexID,
    x: x,
    y: y,
    snapMask: snapMask
  };
}
function updateDraggingVertex(x, y, snapMask) {
  return {
    type: _constants.UPDATE_DRAGGING_VERTEX,
    x: x,
    y: y,
    snapMask: snapMask
  };
}
function endDraggingVertex(x, y, snapMask) {
  return {
    type: _constants.END_DRAGGING_VERTEX,
    x: x,
    y: y,
    snapMask: snapMask
  };
}