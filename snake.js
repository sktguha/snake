const arr = [];
const dim = 50;
const width = window.innerWidth;
const height = window.innerHeight;

function init() {
    for (let i = 0; i < 5; i++) {
        const div = document.createElement("div");
        div.style.width = dim + "px";
        div.style.height = dim + "px";
        div.style.position = "absolute";
        div.style.top = "300px";
        div.style.left = (200 + i * dim) + "px";
        div.innerText = "e";
        document.body.appendChild(div);
        arr.push(div);
    }
    setInterval(uT, 1000);
}

init();

let prevKey = "ArrowRight";

function uT(){
    const h = arr[0];
    let l = h.style.left.split("px")[0] * 1;
    let t = h.style.top.split("px")[0] * 1;
    if(prevKey === "ArrowLeft"){
        l -= dim;
    } else if(prevKey === "ArrowRight"){
        l += dim;
    } else if(prevKey === "ArrowUp"){
        t -= dim;
    } else if(prevKey === "ArrowDown"){
        t += dim;
    }
    if(l< 0 || l > width || t< 0 || t > height) {
        alert("game over");
        location.reload();
    }
    h.style.left = l + "px";
    h.style.top = t + "px";
    for(let i= 1; i<arr.length; i++){
        const p = arr[i - 1];
        const c = arr[i];
        c.style.left = p.style.left;
        c.style.top = p.style.top;
    }
}

document.onkeydown = function(e){

    console.log(e);
    if(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].indexOf(e.key) === -1)
        return;
    //if same direction, can't turn backwards. also make them progress automatically one by one

    const k = e.key;
    if(k === "ArrowLeft"){
        if(prevKey === "ArrowRight") return;
        prevKey = k;
        uT();
    } else if(k === "ArrowRight"){
        if(prevKey === "ArrowLeft") return;
        prevKey = k;
        uT();
    } else if(k === "ArrowUp"){
        if(prevKey === "ArrowDown") return;
        prevKey = k;
        uT();
    } else if(k === "ArrowDown"){
        if(prevKey === "ArrowUp") return;
        prevKey = k;
        uT();
    }

};
