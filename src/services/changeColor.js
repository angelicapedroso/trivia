const changeColor = () => {
  const buttons = document.querySelectorAll('.optionButton');
  for (let i = 0; i < buttons.length; i += 1) {
    if (buttons[i].name === 'btnCorrect') {
      buttons[i].style.setProperty('border', '3px solid rgb(6, 240, 15)');
    } else {
      buttons[i].style.setProperty('border', '3px solid rgb(255, 0, 0)');
    }
  }
};

export default changeColor;
