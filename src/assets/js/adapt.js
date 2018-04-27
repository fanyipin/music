/**
 * Created by Administrator on 2018/3/1.
 */
export default function autoSize(width) {
  var width = width ? width: 640;
  var units = width / 100;
  var width = document.documentElement.clientWidth;
  width = width > 1080 ? 1080 : width;
  width = width <= 240 ? 240 : width;
  var calFontSize = width / units;
  document.documentElement.style.fontSize = calFontSize + "px"
}
