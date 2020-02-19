export const validateInputPhoneNumber = e => {
  const event = e;
  if (
    event.keyCode === 8 || //backspace
    event.keyCode === 46 || //del
    (event.keyCode >= 37 && event.keyCode <= 40) || //arrows
    ((event.ctrlKey || event.metaKey) && event.keyCode === 65) || //ctrl+a, cmd+a
    ((event.ctrlKey || event.metaKey) && event.keyCode === 86) || //ctrl+v, cmd+v
    ((event.ctrlKey || event.metaKey) && event.keyCode === 67) || //ctrl+c, cmd+c
    ((event.ctrlKey || event.metaKey) && event.keyCode === 88) //ctrl+x, cmd+x
  ) {
    return;
  } else if (
    event.target.value.length === 0 &&
    ((event.shiftKey && event.keyCode === 187) || event.keyCode === 107) //first simbol "+"
  ) {
    return;
  } else if (
    event.target.value.length !== 0 &&
    ((!event.shiftKey && event.keyCode === 189) ||
    event.keyCode === 109 || // in middle of the string "-"
      event.keyCode === 32) // im middle of the string space
  ) {
    return;
  } else if (
    (event.keyCode >= 48 && event.keyCode <= 57) ||
    (event.keyCode >= 96 && event.keyCode <= 105)
  ) {
    return; //only numbers input
  }
  event.preventDefault();
};
