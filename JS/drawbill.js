function drawbill(holderId, width, color, canvasid) {
    $("#" + holderId).html("<canvas id='" + canvasid + "' class='billcanvas' width='1001' height='501'></canvas>");
    var ctx = document.getElementById(canvasid).getContext("2d");

    // #layer1
    ctx.save();
    ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, 60.214841, -341.576170);

    // #path5309
    ctx.beginPath();
    ctx.lineJoin = 'miter';
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.lineCap = 'butt';
    ctx.lineWidth = 1.000000;
    ctx.fillStyle = color;
    ctx.moveTo(-23.078131, 376.095710);
    ctx.lineTo(-23.078131, 808.056650);
    ctx.lineTo(904.220690, 808.056650);
    ctx.lineTo(904.220690, 376.095710);
    ctx.lineTo(-23.078131, 376.095710);
    ctx.fill();
    ctx.stroke();

    // #rect3336
    ctx.beginPath();
    ctx.lineJoin = 'miter';
    ctx.strokeStyle = 'rgb(0, 0, 0)';
    ctx.lineCap = 'butt';
    ctx.lineWidth = 1.000000;
    ctx.fillStyle = color;
    ctx.moveTo(-59.714841, 342.076170);
    ctx.lineTo(-59.714841, 842.076200);
    ctx.lineTo(940.857400, 842.076200);
    ctx.lineTo(940.857400, 342.076170);
    ctx.lineTo(-59.714841, 342.076170);
    ctx.moveTo(-23.078121, 376.380860);
    ctx.lineTo(904.220700, 376.380860);
    ctx.lineTo(904.220700, 808.341800);
    ctx.lineTo(-23.078121, 808.341800);
    ctx.lineTo(-23.078121, 376.380860);
    ctx.fill();
    ctx.stroke();

    // #g4303-9
    ctx.save();
    ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -93.999931, 3.999709);

    // #path4184-4
    ctx.beginPath();
    ctx.lineJoin = 'miter';
    ctx.lineCap = 'butt';
    ctx.lineWidth = 0.894796;
    ctx.fillStyle = ColorLuminance(color, -0.1);
    ctx.moveTo(70.921794, 372.096010);
    ctx.lineTo(70.921794, 804.056940);
    ctx.lineTo(998.220620, 804.056940);
    ctx.lineTo(998.220620, 372.096010);
    ctx.lineTo(70.921794, 372.096010);
    ctx.moveTo(94.527263, 396.558900);
    ctx.lineTo(973.328050, 396.558900);
    ctx.lineTo(973.328050, 780.021790);
    ctx.lineTo(94.527263, 780.021790);
    ctx.lineTo(94.527263, 396.558900);
    ctx.fill();

    // #path4242-1
    ctx.beginPath();
    ctx.fillStyle = ColorLuminance(color, -0.1);
    ctx.moveTo(534.571230, 390.108100);
    ctx.bezierCurveTo(671.052947, 390.108100, 781.693240, 478.741563, 781.693240, 588.076480);
    ctx.bezierCurveTo(781.693240, 697.411397, 671.052947, 786.044860, 534.571230, 786.044860);
    ctx.bezierCurveTo(398.089513, 786.044860, 287.449220, 697.411397, 287.449220, 588.076480);
    ctx.bezierCurveTo(287.449220, 478.741563, 398.089513, 390.108100, 534.571230, 390.108100);
    ctx.fill();

    // #g4289-3
    ctx.save();
    ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -1.616945, -3.996273);

    // #g4279-2
    ctx.save();
    ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, 2.000000, 0.000000);

    // #rect4249-0
    ctx.beginPath();
    ctx.fillStyle = ColorLuminance(color, -0.1);
    ctx.moveTo(115.495390, 415.074720);
    ctx.lineTo(115.495390, 516.070790);
    ctx.lineTo(135.495390, 501.611790);
    ctx.lineTo(135.495390, 435.074720);
    ctx.lineTo(227.538360, 435.074720);
    ctx.lineTo(254.495390, 415.588390);
    ctx.lineTo(254.495390, 415.074720);
    ctx.lineTo(115.495390, 415.074720);
    ctx.fill();

    // #rect4249-3-7
    ctx.beginPath();
    ctx.fillStyle = ColorLuminance(color, -0.1);
    ctx.moveTo(952.880910, 415.074720);
    ctx.lineTo(952.880910, 516.070790);
    ctx.lineTo(932.880910, 501.611790);
    ctx.lineTo(932.880910, 435.074720);
    ctx.lineTo(840.837940, 435.074720);
    ctx.lineTo(813.880910, 415.588390);
    ctx.lineTo(813.880910, 415.074720);
    ctx.lineTo(952.880910, 415.074720);
    ctx.fill();
    ctx.restore();

    // #g4283-7
    ctx.save();
    ctx.transform(1.000000, 0.000000, 0.000000, -1.000000, 2.000000, 1184.145500);

    // #path4285-7
    ctx.beginPath();
    ctx.fillStyle = ColorLuminance(color, -0.1);
    ctx.moveTo(115.495390, 415.074720);
    ctx.lineTo(115.495390, 516.070790);
    ctx.lineTo(135.495390, 501.611790);
    ctx.lineTo(135.495390, 435.074720);
    ctx.lineTo(227.538360, 435.074720);
    ctx.lineTo(254.495390, 415.588390);
    ctx.lineTo(254.495390, 415.074720);
    ctx.lineTo(115.495390, 415.074720);
    ctx.fill();

    // #path4287-5
    ctx.beginPath();
    ctx.fillStyle = ColorLuminance(color, -0.1);
    ctx.moveTo(952.880910, 415.074720);
    ctx.lineTo(952.880910, 516.070790);
    ctx.lineTo(932.880910, 501.611790);
    ctx.lineTo(932.880910, 435.074720);
    ctx.lineTo(840.837940, 435.074720);
    ctx.lineTo(813.880910, 415.588390);
    ctx.lineTo(813.880910, 415.074720);
    ctx.lineTo(952.880910, 415.074720);
    ctx.fill();
    ctx.restore();
    ctx.restore();
    ctx.restore();
    ctx.restore();

    // #layer2
    ctx.save();
    ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, 60.214841, -341.576170);
    ctx.restore();

    // #layer3
    ctx.save();
    ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, 60.214841, -341.576170);

    // #g4303
    ctx.save();
    ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -93.999931, 3.999709);

    // #path4184
    ctx.beginPath();
    ctx.lineJoin = 'miter';
    ctx.lineCap = 'butt';
    ctx.lineWidth = 0.894796;
    ctx.fillStyle = ColorLuminance(color, -0.1);
    ctx.moveTo(70.921794, 372.096010);
    ctx.lineTo(70.921794, 804.056940);
    ctx.lineTo(998.220620, 804.056940);
    ctx.lineTo(998.220620, 372.096010);
    ctx.lineTo(70.921794, 372.096010);
    ctx.moveTo(94.527263, 396.558900);
    ctx.lineTo(973.328050, 396.558900);
    ctx.lineTo(973.328050, 780.021790);
    ctx.lineTo(94.527263, 780.021790);
    ctx.lineTo(94.527263, 396.558900);
    ctx.fill();

    // #path4242
    ctx.beginPath();
    ctx.fillStyle = ColorLuminance(color, -0.1);
    ctx.moveTo(534.571230, 390.108100);
    ctx.bezierCurveTo(671.052947, 390.108100, 781.693240, 478.741563, 781.693240, 588.076480);
    ctx.bezierCurveTo(781.693240, 697.411397, 671.052947, 786.044860, 534.571230, 786.044860);
    ctx.bezierCurveTo(398.089513, 786.044860, 287.449220, 697.411397, 287.449220, 588.076480);
    ctx.bezierCurveTo(287.449220, 478.741563, 398.089513, 390.108100, 534.571230, 390.108100);
    ctx.fill();

    // #g4289
    ctx.save();
    ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, -1.616945, -3.996273);

    // #g4279
    ctx.save();
    ctx.transform(1.000000, 0.000000, 0.000000, 1.000000, 2.000000, 0.000000);

    // #rect4249
    ctx.beginPath();
    ctx.fillStyle = ColorLuminance(color, -0.1);
    ctx.moveTo(115.495390, 415.074720);
    ctx.lineTo(115.495390, 516.070790);
    ctx.lineTo(135.495390, 501.611790);
    ctx.lineTo(135.495390, 435.074720);
    ctx.lineTo(227.538360, 435.074720);
    ctx.lineTo(254.495390, 415.588390);
    ctx.lineTo(254.495390, 415.074720);
    ctx.lineTo(115.495390, 415.074720);
    ctx.fill();

    // #rect4249-3
    ctx.beginPath();
    ctx.fillStyle = ColorLuminance(color, -0.1);
    ctx.moveTo(952.880910, 415.074720);
    ctx.lineTo(952.880910, 516.070790);
    ctx.lineTo(932.880910, 501.611790);
    ctx.lineTo(932.880910, 435.074720);
    ctx.lineTo(840.837940, 435.074720);
    ctx.lineTo(813.880910, 415.588390);
    ctx.lineTo(813.880910, 415.074720);
    ctx.lineTo(952.880910, 415.074720);
    ctx.fill();
    ctx.restore();

    // #g4283
    ctx.save();
    ctx.transform(1.000000, 0.000000, 0.000000, -1.000000, 2.000000, 1184.145500);

    // #path4285
    ctx.beginPath();
    ctx.fillStyle = ColorLuminance(color, -0.1);
    ctx.moveTo(115.495390, 415.074720);
    ctx.lineTo(115.495390, 516.070790);
    ctx.lineTo(135.495390, 501.611790);
    ctx.lineTo(135.495390, 435.074720);
    ctx.lineTo(227.538360, 435.074720);
    ctx.lineTo(254.495390, 415.588390);
    ctx.lineTo(254.495390, 415.074720);
    ctx.lineTo(115.495390, 415.074720);
    ctx.fill();

    // #path4287
    ctx.beginPath();
    ctx.fillStyle = ColorLuminance(color, -0.1);
    ctx.moveTo(952.880910, 415.074720);
    ctx.lineTo(952.880910, 516.070790);
    ctx.lineTo(932.880910, 501.611790);
    ctx.lineTo(932.880910, 435.074720);
    ctx.lineTo(840.837940, 435.074720);
    ctx.lineTo(813.880910, 415.588390);
    ctx.lineTo(813.880910, 415.074720);
    ctx.lineTo(952.880910, 415.074720);
    ctx.fill();
    ctx.restore();
    ctx.restore();
    ctx.restore();
    ctx.restore();

    $("#" + canvasid).width(width);
}