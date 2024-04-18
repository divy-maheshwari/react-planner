import * as Three from 'three';
import React from 'react';

const WIDTH   = 50;
const DEPTH   = 50;
const HEIGHT  = 100;

// Material for the human body (adjustable for color and texture)
const skinMaterial = new Three.MeshLambertMaterial({ color: 0xFFE0B2 });

function makeHumanModel() {

  let human = new Three.Object3D();

  // Head (sphere)
  let head_geom = new Three.SphereGeometry(10, 32, 32);
  let head = new Three.Mesh(head_geom, skinMaterial);
  head.position.set(0, HEIGHT - 3, 0);
  human.add(head);

  // Torso (cylinder)
  let torso_geom = new Three.CylinderGeometry(12, 12, 45, 32, 32);
  let torso = new Three.Mesh(torso_geom, skinMaterial);
  torso.position.set(0, HEIGHT - 35, 0);
  human.add(torso);

  // Arms (cylinders with spheres for hands)
  // let arm_geom = new Three.CylinderGeometry(3, 3, 20, 32, 32);
  // let arms = [];

  // for (let i = 0; i < 2; i++) {
  //   arms[i] = new Three.Object3D();
  //   let arm = new Three.Mesh(arm_geom, skinMaterial);
  //   arms[i].add(arm);

  //   let hand_geom = new Three.SphereGeometry(3, 32, 32);
  //   let hand = new Three.Mesh(hand_geom, skinMaterial);
  //   hand.position.set(0, 10, 0);
  //   arms[i].add(hand);

  //   arms[i].position.set((i === 0) ? -8 : 8, HEIGHT - 20, 0);
  //   human.add(arms[i]);
  // }

  // Legs (cylinders with spheres for feet)
  let leg_geom = new Three.CylinderGeometry(5, 5, 50, 32, 32);
  let legs = [];

  for (let i = 0; i < 2; i++) {
    legs[i] = new Three.Object3D();
    let leg = new Three.Mesh(leg_geom, skinMaterial);
    legs[i].add(leg);

    let foot_geom = new Three.SphereGeometry(4, 32, 32);
    let foot = new Three.Mesh(foot_geom, skinMaterial);
    foot.position.set(0, 20, 0);
    legs[i].add(foot);

    legs[i].position.set((i === 0) ? -5 : 5, HEIGHT - 75, 0);
    human.add(legs[i]);
  }

  return human;
}

export default {
  name: "human",
  prototype: "items",

  info: {
    tag: ['skin', 'body','human'],
    title: "human",
    description: "human",
    image: require('./human.png')
  },

  properties: {
    altitude: {
      label: "altitude",
      type: "length-measure",
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {

    let angle = element.rotation + 90;

    let textRotation = 0;
    if (Math.sin(angle * Math.PI / 180) < 0) {
      textRotation = 180;
    }

    return (
      <g transform={`translate(${-WIDTH / 2},${-DEPTH / 2})`}>
      <rect key="1" x="0" y="0" width={WIDTH} height={DEPTH}
        style={{stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"}}/>
      <text key="2" x="0" y="0"
            transform={`translate(${WIDTH / 2}, ${DEPTH / 2}) scale(1,-1) rotate(${textRotation})`}
        style={{textAnchor: "middle", fontSize: "11px"}}>
        {element.type}
        </text>
        </g>
    )
  },

  render3D: function (element, layer, scene) {

    let newAltitude = element.properties.get('altitude').get('length');
    newAltitude=0;

    let humanModel = makeHumanModel();
    humanModel.position.y += newAltitude;
    humanModel.scale.set(1, HEIGHT / 180, 1);  // Adjust scaling based on desired proportions

    let lod = new Three.LOD();

    lod.addLevel(humanModel, 0);
    lod.updateMatrix();
    lod.matrixAutoUpdate = false;

    // ... (similar logic to LOD implementation for hanger, adapting for human model)
    if (element.selected) {
        let bbox = new Three.BoxHelper(lod, 0x99c3fb);
        bbox.material.linewidth = 5;
        bbox.renderOrder = 1000;
        bbox.material.depthTest = false;
        lod.add(bbox);
      }

    return Promise.resolve(lod);
  }
};
