var QRversion = 3;
var QRsize = QRversion * 4 + 17;
var P_R1  = D12,
    P_G1  = D13,
    P_B1  = D21,

    P_R2  = D4,
    P_G2  = D27,
    P_B2  = D17,

    P_A   = D19,
    P_B   = D23,
    P_C   = D18,
    P_D   = D5,
    P_E   = D15,
    P_LAT = D22,
    P_CLK = D14,
    P_OE  = D2,
    MaxLed = 256,
    X = 64,
    Y = 64;

    function initFM6126() {
        console.log('<< initFM6126()');
        var C12 = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var C13 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
        digitalWrite([P_OE, P_LAT, P_CLK], 0b100);
        // Send Data to control register 11
        for (var l = 0; l < MaxLed; l++) {
            y = l % 16;
            if (C12[y]) {
                digitalWrite([P_R1, P_G1, P_B1, P_R2, P_B2, P_G2], 0b111111);
            } else {
                digitalWrite([P_R1, P_G1, P_B1, P_R2, P_B2, P_G2], 0);
            }
            digitalWrite(P_LAT, (l > MaxLed - 12) ? 1 : 0);
            digitalWrite(P_CLK, 1);
            digitalWrite(P_CLK, 0);
        }
        digitalWrite(P_LAT, 0);
        digitalWrite(P_CLK, 0);
        // Send Data to control register 12
        for (l = 0; l < MaxLed; l++) {
            y = l % 16;
            if (C13[y]) {
                digitalWrite([P_R1, P_G1, P_B1, P_R2, P_B2, P_G2], 0b111111);
            } else {
                digitalWrite([P_R1, P_G1, P_B1, P_R2, P_B2, P_G2], 0);
            }
            digitalWrite(P_LAT, (l > MaxLed - 13) ? 1 : 0);
            digitalWrite(P_CLK, 1);
            digitalWrite(P_CLK, 0);
        }
        digitalWrite(P_LAT, 0);
        digitalWrite(P_CLK, 0);
        console.log('>> initFM6126()');
    }



options = {
  "double_buffer":true,
  "r1":P_R1,"g1":P_G1,"b1":P_B1,
  "r2":P_R2,"g2":P_G2,"b2":P_B2,
  "a":P_A,"b":P_B,"c":P_C, "d":P_D,"e":P_E,
  "lat":P_LAT,"oe":P_OE,"clk":P_CLK
};

    console.log(ESP32.getState());
    initFM6126();

    var g = i2s_matrix.connect(64,64,16,options);
    g.flip = () => { i2s_matrix.flip();};
    g.setBrightness = (b) => { i2s_matrix.setBrightness(b);};
    g.setBrightness(10);
    g.clear().setFont("6x8",1);
    QRoutput = Graphics.createArrayBuffer(QRsize,QRsize,1,{msb:true});

    setInterval(function(){

      var t = new Date(); // get the current date and time
      var time = t.getHours()+":"+("0"+t.getMinutes()).substr(-2);
      var seconds = ("0"+t.getSeconds()).substr(-2);
      var date = t.toString().replace(/\d\d:.*/,"");
      var QRinput = time + ":" + seconds + " " + date;
      console.log(QRinput);
      //QRinput = "https://atcnetz.de";
      qr_code.generate(QRinput,QRoutput.buffer,QRversion,3);
      g.drawImage(QRoutput.asImage("string"),3,3,{scale:2});

    },1000);