const UploadBox = document.querySelector(".img"),
fileInput = UploadBox.querySelector("input"),
Img = UploadBox.querySelector("img");
let Imgwidth = document.getElementById("width"),
Imgheight = document.getElementById("height"),
ratioLock = document.getElementById("lock"),
Quality = document.getElementById("quality"),
DownloadBtn = document.getElementById("download"),
ImgQual = document.getElementById("ImgQuality");
let ImgRatio;

function Rcheck(){
    if(ImgQual.classList.contains("active")){
        ImgQual.classList.remove("active");
    }else{
        ImgQual.classList.add("active");
    }
}

const loadFile = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    Img.src = URL.createObjectURL(file);
    Img.addEventListener("load", () => {
        Img.classList.add("active");
        document.getElementById("img").style.border = "none";
        UploadBox.querySelector("p").classList.add("hidden");
        Imgwidth.value = Img.naturalWidth;
        Imgheight.value = Img.naturalHeight;
        document.getElementById("container").style.height = "580px";
        document.getElementById("wrapper").classList.add("active");
        ImgRatio = Img.naturalWidth / Img.naturalHeight;
        
    });
    

}

Imgwidth.addEventListener("keyup", ()=>{
    const height = lock.checked ? Imgwidth.value / ImgRatio : Imgheight.value;
    Imgheight.value = Math.floor(height);
});
Imgheight.addEventListener("keyup", ()=>{
    const width = lock.checked ? Imgheight.value * ImgRatio : Imgwidth.value;
    Imgwidth.value = Math.floor(width);
});

const RnD = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    const ImgQuality = Quality.checked ? ImgQual.value : 1.0;

    canvas.width = Imgwidth.value;
    canvas.height = Imgheight.value;

    ctx.drawImage(Img, 0, 0, canvas.width, canvas.height);
    a.href = canvas.toDataURL("images/jpeg", ImgQuality);
    console.log(ImgQuality);
    // a.download = new Date().getTime();
    a.download = crypto.randomUUID();
    a.click();
}

DownloadBtn.addEventListener("click", RnD);
fileInput.addEventListener("change", loadFile);
UploadBox.addEventListener("click", ()=> fileInput.click());