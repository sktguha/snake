const arr = [];
const dim = 30;
const width = window.innerWidth;
const height = window.innerHeight;
const initLen = 5;

let prevKey = "ArrowRight";
function init() {
    for (let i = 0; i < initLen; i++) {
        const div = document.createElement("div");
        div.style.width = dim + "px";
        div.style.height = dim + "px";
        div.style.position = "absolute";
        div.style.top = "300px";
        div.style.left = (200 + i * dim) + "px";
        // div.innerText = "e";
        div.style.background = "red";
        div.style.border = "2px solid black";
        document.body.appendChild(div);
        arr.push(div);
    }
    uT();uT();uT();uT();
    // setInterval(uT, 1000);
}

init();


function limit(val, maxValue) {
    if (val > maxValue) {
        val = 0;
    } else if (val < 0) {
        val = maxValue;
    }
    return val;
}

function uT(){
    const h = arr[0];
    let l = h.style.left.split("px")[0] * 1;
    let t = h.style.top.split("px")[0] * 1;
    arr[1].style.top = h.style.top;
    arr[1].style.left = h.style.left;
    if(prevKey === "ArrowLeft"){
        l -= dim;
    } else if(prevKey === "ArrowRight"){
        l += dim;
    } else if(prevKey === "ArrowUp"){
        t -= dim;
    } else if(prevKey === "ArrowDown"){
        t += dim;
    }
    t = limit(t, height);
    l = limit(l, width);

    // if(l< 0 || l > width || t< 0 || t > height) {
    //     // alert("game over");
    //     // location.reload();
    // }
    h.style.left = l + "px";
    h.style.top = t + "px";
    for(let i= arr.length-1; i>0; i--){
        const p = arr[i - 1];
        const c = arr[i];
        c.style.left = p.style.left;
        c.style.top = p.style.top;
    }
}

const _handleKey = function (e) {

    console.log(e);
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].indexOf(e.key) === -1)
        return;
    //if same direction, can't turn backwards. also make them progress automatically one by one

    const k = e.key;
    if (k === "ArrowLeft") {
        if (prevKey === "ArrowRight") return;
        prevKey = k;
        uT();
    } else if (k === "ArrowRight") {
        if (prevKey === "ArrowLeft") return;
        prevKey = k;
        uT();
    } else if (k === "ArrowUp") {
        if (prevKey === "ArrowDown") return;
        prevKey = k;
        uT();
    } else if (k === "ArrowDown") {
        if (prevKey === "ArrowUp") return;
        prevKey = k;
        uT();
    }

};
const handleKey = _.throttle(_handleKey, 150);
document.onkeydown = handleKey;
