#!/usr/bin/node

var circle = {

  /**
   * 计算圆的面积
   *
   * @param radius半径
   * @returns {undefined}面积
   */
  area: (radius)=>{
    return Math.PI * radius * radius;
  },
  circumference:(radius)=>{
    return 2 * Math.PI * radius;
  },
  diameter:(radius)=>{
    return 2 * radius;
  }
};
console.dir(module);
module.exports = circle;
