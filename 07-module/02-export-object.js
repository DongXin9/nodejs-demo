#!/usr/bin/node

var circle = {

  /**
   * 计算圆的面积
   *
   * @param radius半径
   * @returns {undefined}面积
   */
  'area': function(radius){
    return Math.PI * radius * radius;
  },
  'circumference':function(radius){
    return 2 * Math.PI * radius;
  },
  'diameter':function(radius){
    return 2 * radius;
  }
};
console.dir(module);
module.exports = circle;
