var s01, s02, s03, s04, s05, s06, s07

ctrlR = 20;
ctrlX = 0;
ctrlY = 0;

function preload() {
  s01 = loadSound("sound1.mp3");
  s02 = loadSound("s02.mp3");
  s03 = loadSound("s20.mp3");
  s04 = loadSound("s18.mp3");
  s05 = loadSound("s06.mp3");
  s06 = loadSound("s01.mp3");
  s07 = loadSound("s23.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('white');
  
  s01.setVolume(1);
  s02.setVolume(1);
  s03.setVolume(1);
  s04.setVolume(1);
  s05.setVolume(1);
  s06.setVolume(1);
  s07.setVolume(1);
  
  if (Controller && Controller.supported) {
    Controller.search();
  
    window.addEventListener('gc.button.press', function(event) {
      if (event.detail.value > 0.1) {
        //console.log(event.detail);
        if (event.detail.name == 'FACE_2' || event.detail.name == 'MISCBUTTON_5') {
          'MISCBUTTON_5' == s02.play();
          // A button or LT
          ctrlR += 5;
        } else if (event.detail.name == 'FACE_1' || event.detail.name == 'MISCBUTTON_6') { 
          'MISCBUTTON_6' == s06.play();
          // B button or RT
          ctrlR -= 5;
        } else if (event.detail.name.indexOf('DPAD_')>-1) {
          'DPAD_' == s03.play();
          // arrows
          dpad_dir = event.detail.name.replace('DPAD_', '')
          ctrlX += (dpad_dir == 'RIGHT') ? 10 : 
                         (dpad_dir == 'LEFT') ? -10 : 0;
          ctrlY += (dpad_dir == 'DOWN') ? 10 : 
                         (dpad_dir == 'UP') ? -10 : 0;
        
        } else if (event.detail.name.indexOf('MISCBUTTON_')>-1) {
          'MISCBUTTON_' == s07.play();
          // xbox
          dpad_dir = event.detail.name.replace('MISCBUTTON_', '')
          ctrlX += (dpad_dir == '2') ? 10 : 
                         (dpad_dir == '3') ? -10 : 0;
          ctrlY += (dpad_dir == '1') ? 10 : 
                         (dpad_dir == '4') ? -10 : 0;
          
        }
      }
    }, false);
  }
    
}

function draw() {
  ellipse(
    400 + ctrlX, 
    400 + ctrlY, 
    ctrlR
  );
  stroke('black');
  strokeWeight(5);
  //fill('black');
}

function changeLineColor() {
  var gamepads = navigator.getGamepads();
  //var newBackgroundIndex = curIndex;

  for (var i in controllers) {
    let controller = gamepads[i];
    if (controller.buttons) {
      for (var btn = 0; btn < controller.buttons.length; btn++) {
        let val = controller.buttons[btn];
        if (btn == 13) {
          if (buttonPressed(val, btn) && released[btn]) {
            released[btn] = false;
            if (lineColorIndex > 0) {
              lineColorIndex -= 1;
            } else {
              lineColorIndex = colorCount - 1;
            }
            fill(colors[lineColorIndex]);
            stroke(colors[lineColorIndex]);
          }
        }
        if (btn == 12) {
          if (buttonPressed(val, btn) && released[btn]) {
            released[btn] = false;
            if (lineColorIndex < colorCount - 1) {
              lineColorIndex += 1;
            } else {
              lineColorIndex = 0;
            }
            fill(colors[lineColorIndex]);
            stroke(colors[lineColorIndex]);
          }
        }
      }
    }
  }
}