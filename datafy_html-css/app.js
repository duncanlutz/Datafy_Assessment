const redBox = document.querySelector('.box__red');
const greenBox = document.querySelector('.box__green');
let resizeState = 'wide';
let redBoxMouseState = false;
let greenBoxMouseState = false;
let redTransitionDone = true;
let greenTransitionDone = true;
const screenWidth = 700;

// On load, if the screen is less than screenWidth then run mobile animations.
if (window.outerWidth < screenWidth) {
  resizeState = 'mobile';
}

// On resize check if the window is smaller than screenWidth, if so change resizeState to mobile mode, otherwise set it to wide
window.addEventListener('resize', (e) => {
  if (window.outerWidth < screenWidth) {
    resizeState = 'mobile';
    return;
  }

  resizeState = 'wide';
  return;
});

// To handle hover and animation state I opted out of using the :hover selector in css to scale the boxes,
// instead I used the mouseover and mouseout events to create hover effects. This was I can enable or disable
// hover state changes as the animation is running, which prevents weird visual glitches like flickering
// or a hard "cut" in the boxes size
redBox.addEventListener('mouseover', () => {
  // If box isn't currently animating, add hover class
  if (redTransitionDone === true) {
    redBox.classList.add('box--hover');
    redBoxMouseState = true;
  }
});

redBox.addEventListener('mouseout', (e) => {
  redBox.classList.remove('box--hover');
  redBoxMouseState = false;
});

greenBox.addEventListener('mouseover', (e) => {
  if (greenTransitionDone === true) {
    greenBox.classList.add('box--hover');
    greenBoxMouseState = true;
  }
});

greenBox.addEventListener('mouseout', (e) => {
  greenBox.classList.remove('box--hover');
  greenBoxMouseState = false;
});

/**
 * Run the red boxes transition.
 * @param {string} dir - Sets the transitions direction, indicates whether the resizeState is in mobile or wide
 */
const runRedTransition = (dir) => {
  // First I add the "-down" class which transitions the box down past the bottom of the screen
  redBox.classList.add(`box__red--${dir}-down`);

  setTimeout(() => {
    // I wait half a second, long enough for the animation to finish, and then remove my "box--transition-handler" class.
    // This class is on the box divs by default and contains the transition for the transform property,
    // but if I left it on while I moved the box from below the frame to above the frame it would slide through the screen, so I remove it for a moment.
    redBox.classList.remove('box--transition-handler');

    // Remove the "-down" transition class, add the "-up" transition class
    redBox.classList.remove(`box__red--${dir}-down`);
    redBox.classList.add(`box__red--${dir}-up`);

    setTimeout(() => {
      // Wait 100ms, then add back the transition handler so the box slides back into frame smoothly
      redBox.classList.add('box--transition-handler');
      // Remove the "-up" transition class so the box slides back into it's original location.
      redBox.classList.remove(`box__red--${dir}-up`);

      // Wait half a secon
      setTimeout(() => {
        // Remove the "--hold-scale" class which locks the box at full scale while the animation plays out
        redBox.classList.remove('box--hold-scale');

        // If the mouse isn't currently hovered over the box, remove the "--hover" class.
        if (!redBoxMouseState) redBox.classList.remove('box--hover');

        // Mark the transition as complete so we can resume hover state changes
        redTransitionDone = true;
      }, 500);
    }, 100);
  }, 500);
};

const runGreenTransition = () => {
  greenBox.classList.add(`box__green--wide-small`);

  setTimeout(() => {
    greenBox.classList.remove(`box__green--wide-small`);
    setTimeout(() => {
      greenBox.classList.remove('box--hold-scale');
      greenTransitionDone = true;
    }, 500);
  }, 1000);
};

redBox.addEventListener('click', () => {
  // Check screen width before running transition, this prevents errors when the window is put into or taken out of full screen
  // since full screen doesn't register as a "resize" event
  if (window.outerWidth < screenWidth) {
    resizeState = 'mobile';
  } else {
    resizeState = 'wide';
  }

  // Set transition done state to false, this prevents changes to the hover state while the animation is running
  redTransitionDone = false;

  // If the user is currently hovering, lock the scale in until the animation is over
  const tmpHoverState = redBoxMouseState;
  if (tmpHoverState === true) {
    redBox.classList.add('box--hold-scale');
  }

  // Run transition
  runRedTransition(resizeState);
  return;
});

greenBox.addEventListener('click', (e) => {
  if (window.outerWidth < screenWidth) {
    resizeState = 'mobile';
  } else {
    resizeState = 'wide';
  }
  greenTransitionDone = false;

  runGreenTransition();
  return;
});
