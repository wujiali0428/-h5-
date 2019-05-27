
window.onresize = r;
function r() {
    var winW = window.innerWidth;
    document.getElementsByTagName("html")[0].style.fontSize = (100 / 1080) * winW + "px";
}
r();