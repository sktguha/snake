const arr = [];
const dim = 30;
const width = dim * 40;
const height = dim * 15;//window.innerHeight;
const div = document.getElementById("bd");
div.style.height = height;
div.style.width = width;
const initLen = 12;
const initTop = "150px";
const initLeft = 400;
let pause = false;

let prevKey = "ArrowRight";
function init() {
    for (let i = 0; i < initLen; i++) {
        const div = document.createElement("div");
        div.style.width = dim + "px";
        div.style.height = dim + "px";
        div.style.position = "absolute";
        div.style.top = initTop;
        div.style.left = (initLeft - (i * dim)) + "px";
        // div.innerText = "e";
        div.style.background = "red";
        div.style.outline = "2px solid black";
        document.body.appendChild(div);
        arr.push(div);
    }
    arr[0].style.background = "black";
    setInterval(update, 200);
}

function limit(val, maxValue) {
    if (val > maxValue) {
        val = 0;
    } else if (val < 0) {
        val = maxValue;
    }
    return val;
}


function _update(){
    if(pause) return;

    const h = arr[0];
    let l = h.style.left.split("px")[0] * 1;
    let t = h.style.top.split("px")[0] * 1;
    let oldTop = h.style.top;
    let oldleft = h.style.left;

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
    h.style.left = l + "px";
    h.style.top = t + "px";
    // }
    if(checkColl(h)){
        // console.log(("over"));;
        alert("over");
    }
    for(let i= arr.length-1; i>1; i--){
        const p = arr[i - 1];
        const c = arr[i];
        c.style.left = p.style.left;
        c.style.top = p.style.top;
    }
    arr[1].style.top = oldTop;
    arr[1].style.left = oldleft;
}

let update = _.throttle(_update, 50);

function checkColl(h) {
    return _.some(_.tail(arr), function (e) {
        return Math.abs(parseInt(e.style.left) - parseInt(h.style.left)) < dim/2 &&
            Math.abs(parseInt(e.style.top)- parseInt(h.style.top)) < dim/2
    })
}

function checkCollision(e1, e2) {
    const rect1 = e1.getBoundingClientRect();
    const rect2 = e2.getBoundingClientRect();
    const overlap = !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
    return overlap;
}

const _handleKey = function (e) {

    console.log(e);
    const k = e.key;
    if(k === "p"){
        pause = !pause;
        st.innerText = pause ? "paused" : "score";  
    }
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].indexOf(e.key) === -1) {
        return;
    }

    //if same direction, can't turn backwards. also make them progress automatically one by one
    if (k === "ArrowLeft") {
        if (prevKey === "ArrowRight") return;
        prevKey = k;
        update();
    } else if (k === "ArrowRight") {
        if (prevKey === "ArrowLeft") return;
        prevKey = k;
        update();
    } else if (k === "ArrowUp") {
        if (prevKey === "ArrowDown") return;
        prevKey = k;
        update();
    } else if (k === "ArrowDown") {
        if (prevKey === "ArrowUp") return;
        prevKey = k;
        update();
    }

};
const handleKey = _.throttle(_handleKey, 30);
document.onkeydown = handleKey;
init();