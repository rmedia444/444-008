let count = 0;
let progressBar;
let progressInterval;
const maxWidth = window.innerWidth * 0.85;

document.addEventListener("DOMContentLoaded", function () {
  progressBar = document.getElementById("progressbar");
});

function moveGoalkeeperToPosition(goalelement, ballelem, targetTopPercent, targetLeftPercent, duration, initialTopPercent) {

  const goalkeeperImg = document.getElementById("goalkeeper");

  const fps = 60; // Frames per second
  const interval = 1000 / fps; // Interval between each frame in milliseconds
  const frames = duration * fps; // Total frames for the duration

  const rect = goalelement.getBoundingClientRect();
  console.log("rect left: " + rect.left)
  console.log("sxcrollX : " + window.scrollX)
  const initialLeftPercent = (rect.left + window.scrollX - document.body.getBoundingClientRect().left) / (0.4 * window.innerWidth) * 100;
  const distanceTopPercent = targetTopPercent - initialTopPercent;
  const distanceLeftPercent = targetLeftPercent - initialLeftPercent;
  //console.log([initialTopPercent, initialLeftPercent, distanceTopPercent, distanceLeftPercent]);
  let frame = 0;
  const moveInterval = setInterval(() => {
    frame++;
    const newTopPercent = initialTopPercent + (distanceTopPercent / frames) * frame;
    const newLeftPercent = initialLeftPercent + (distanceLeftPercent / frames) * frame;
    goalelement.style.top = newTopPercent + "%";
    goalelement.style.left = newLeftPercent + "%";

    if (frame >= frames) {
      clearInterval(moveInterval);
      goalkeeperImg.src = "./assets/goalkeeper2.png";
      goalelement.style.animation = 'none';
      ballelem.style.animation = 'none';
      setTimeout(() => {
        goalkeeperImg.src = "./assets/goalkeeper.png";
        goalelement.style.top = `${initialTopPercent}%`;
        goalelement.style.left = `${initialLeftPercent}%`;
        document.querySelectorAll('.icon-container').forEach((icon) => {
          icon.classList.remove("hidden");
        });
        goalelement.style.animation = 'run 2.5s linear infinite';
      }, 800);
    }
  }, interval);
}

const initialTopPercent = (rect.top + window.scrollY) / window.innerHeight * 100;
moveGoalkeeperToPosition(goalelement, ballelem, targetTopPercent, targetLeftPercent, duration, initialTopPercent);

function startProgressBar(event, dir) {
  const maxWidth = window.innerWidth * 0.85;
  const ms = 10;
  // maxWidth >= 768 * 0.85 ? 2 : maxWidth >= 425 * 0.85 ? 4 : 6;

  event.preventDefault();

  progressBar.style.display = "block";
  progressBar.style.setProperty('--value', '0');

  let value = 0;

  progressInterval = setInterval(function () {
    value++;
    progressBar.style.setProperty('--value', value);

    const percent = (value / 100) * 100;
    updateProgressBarColor(percent);
    console.log(value)
    if (value >= 100) {
      endProgressBar(dir);
    }
  }, ms);
}

function updateProgressBarColor(percent) {
  const progressBar = document.querySelector('[role="progressbar"]');
  if (percent >= 90) {
    progressBar.style.setProperty('--primary', 'rgba(255, 0, 0, 1)');
    progressBar.style.setProperty('--secondary', 'rgb(228, 76, 11)');
  } else if (percent >= 80) {
    progressBar.style.setProperty('--primary', 'rgb(228, 76, 11)');
    progressBar.style.setProperty('--secondary', 'rgb(252, 137, 5)');
  } else if (percent >= 70) {
    progressBar.style.setProperty('--primary', 'rgb(252, 137, 5)');
    progressBar.style.setProperty('--secondary', 'rgba(241, 112, 6, 1)');
  } else if (percent >= 60) {
    progressBar.style.setProperty('--primary', 'rgba(241, 112, 6, 1)');
    progressBar.style.setProperty('--secondary', 'rgba(231, 204, 5, 1)');
  } else if (percent >= 50) {
    progressBar.style.setProperty('--primary', 'rgba(231, 204, 5, 1)');
    progressBar.style.setProperty('--secondary', 'rgba(208, 222, 33, 1)');
  } else if (percent >= 40) {
    progressBar.style.setProperty('--primary', 'rgba(208, 222, 33, 1)');
    progressBar.style.setProperty('--secondary', 'rgba(164, 232, 5, 1)');
  } else if (percent >= 30) {
    progressBar.style.setProperty('--primary', 'rgba(164, 232, 5, 1)');
    progressBar.style.setProperty('--secondary', 'rgba(79, 220, 74, 1)');
  } else if (percent >= 20) {
    progressBar.style.setProperty('--primary', 'rgba(79, 220, 74, 1)');
    progressBar.style.setProperty('--secondary', 'rgb(50, 167, 83)');
  } else if (percent >= 10) {
    progressBar.style.setProperty('--primary', 'rgb(50, 167, 83)');
    progressBar.style.setProperty('--secondary', 'rgba(0, 128, 0, 1)');
  } else {
    progressBar.style.setProperty('--primary', 'rgba(0, 128, 0, 1)');
    progressBar.style.setProperty('--secondary', 'rgba(0, 128, 0, 1)');
  }
}


function endProgressBar(event, dir) {
  event.preventDefault();
  clearInterval(progressInterval);
  move(dir);
  progressBar.style.display = "none";
}

function move(direction) {
  let goalkeeper = document.querySelector(".goalkeeper")
  let ball = document.getElementById("ball");
  const animationDuration = Math.min(0.6, Math.max(0.15, (maxWidth - parseInt(progressBar.style.getPropertyValue('--value'))) / maxWidth - 0.5));

  if (count < 3) {
    document.querySelectorAll('.icon-container').forEach((icon) => {
      icon.classList.add("hidden");
    });
  }

  if (count < 1) {
    if (goalkeeper) {
      // Stop the animation by setting it to 'none'
      goalkeeper.style.animation = 'none';
      // Perform other actions based on the direction
      switch (direction) {
        case 'left':
          ball.style.animation = `leftAndRotate ${animationDuration}s linear`;
          console.log("B4 " + ball.style.animation);
          moveGoalkeeperToPosition(goalkeeper, ball, 43, 15, 0.4)
          break;
        case 'leftTop':
          ball.style.animation = `leftTopAndRotate ${animationDuration}s linear`;
          moveGoalkeeperToPosition(goalkeeper, ball, 37, 18, 0.4);
          break;
        case 'right':
          ball.style.animation = `rightAndRotate ${animationDuration}s linear`;
          moveGoalkeeperToPosition(goalkeeper, ball, 43, 84, 0.4);
          break;
        case 'rightTop':
          ball.style.animation = `rightTopAndRotate ${animationDuration}s linear`;
          moveGoalkeeperToPosition(goalkeeper, ball, 37, 81, 0.4);
          break;
      }
    }
    console.log(ball.style.animation);
  }
  if (count == 1) {
    const computedStyle = window.getComputedStyle(goalkeeper);
    const currentPosition = computedStyle.getPropertyValue('left');
    goalkeeper.style.animation = 'none';
    goalkeeper.style.left = currentPosition;

    switch (direction) {
      case 'left':
        ball.style.animation = `leftAndRotate ${animationDuration}s linear forwards`;
        break;
      case 'leftTop':
        ball.style.animation = `leftTopAndRotate ${animationDuration}s linear forwards`;
        break;
      case 'right':
        ball.style.animation = `rightAndRotate ${animationDuration}s linear forwards`;
        break;
      case 'rightTop':
        ball.style.animation = `rightTopAndRotate ${animationDuration}s linear forwards`;
        break;
    }
    console.log(ball.style.animation);
    //ball.style.animationFillMode = 'forwards'
    const ballComputedStyle = window.getComputedStyle(ball);
    const currentBallLeft = ballComputedStyle.getPropertyValue('left');
    const currentBallTop = ballComputedStyle.getPropertyValue('top');
    ball.style.left = currentBallLeft;
    ball.style.top = currentBallTop;


    // loadAndPlayAudio();

    setTimeout(function () {
      myFireworks();
      $('#popup_modal').modal('show');
    }, 500);
  }
  count++;
}

function myFireworks() {
  //firework
  var countFirework = 200;
  var defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(countFirework * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    zIndex: 1200,
  });
  fire(0.2, {
    spread: 60,
    zIndex: 1200,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    zIndex: 1200,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    zIndex: 1200,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    zIndex: 1200,
  });
}

function loadAndPlayAudio() {
  // Create a new AudioContext
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Fetch the .wav file
  fetch('./audio/party.wav')
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
          // Create a buffer source
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);
          source.start();
      })
      .catch(e => console.error('Error with decoding audio data:', e));
}

