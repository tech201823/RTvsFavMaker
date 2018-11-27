/* 画像プリロード */

var canvas = document.getElementById('canvas');
var canvasWidth = 800;
var canvasHeight = 450;

// Canvasの準備
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext('2d');

// Canvas上に画像を表示
var img = new Image();
img.src = 'background.png';
img.onload = function() {
    ctx.drawImage(img, 0, 0, canvasWidth, this.height * (canvasWidth / this.width));
}


/* 画像を読み込んで画像を表示 */

var file1 = document.getElementById('file1');
var file2 = document.getElementById('file2');
var uploadImgSrc;

function loadLocalImage(e, dx, dy) {

    var fileData = e.target.files[0];

    // 画像ファイル以外は処理を止める
    if(!fileData.type.match('image.*')) {
        alert('画像を選択してください');
        return;
    }

    // ファイル読み込み
    var reader = new FileReader();
    reader.onload = function() {
        // Canvas上に表示する
        uploadImgSrc = reader.result;
        canvasDraw(dx, dy);
    }
    // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
}

// ファイルが指定された時にloadLocalImage()を実行
file1.addEventListener('change', function(ev){loadLocalImage(ev, 100, 100)}, true);
file2.addEventListener('change', function(ev){loadLocalImage(ev, 500, 100)}, true);

// Canvas上に画像を表示する
function canvasDraw(dx, dy) {

    // Canvas上に画像を表示
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = uploadImgSrc;
    img.onload = function() {
        ctx.drawImage(img, dx, dy, 200, 200);

        // canvasを画像に変換
        var data = canvas.toDataURL();

        // DLリンクを表示
        $('#result').attr("href", data);
        $("#result").attr("download", "sample.png");
        $('#result').text("ダウンロード");
    }

}
