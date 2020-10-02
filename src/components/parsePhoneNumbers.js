const isNumber = phoneNumber => {
  return !isNaN(parseFloat(phoneNumber)) && !isNaN(phoneNumber - 0);
};

const isPhoneNumberCorrect = phoneNumber => {
  if (isNumber(phoneNumber)) {
    return true;
  }
  return false;
};

export const parseNumbersString = (str, isLocalFormat) => {
  const res = str.split(/\n+/);

  const ok = [],
    err = [];

  res.forEach((row, index) => {
    const phoneNumbers = row.split(/[,;\s\t]+/).filter(str => str !== "");
    if (!phoneNumbers.length || phoneNumbers.length > 2) {
      const errRow = {
        row,
        line: index + 1
      };
      err.push(errRow);
    } else {
      const [startNum, endNum] = phoneNumbers;
      let range;
      if (isLocalFormat) {
        range = {
          start: startNum.charAt(0) === "0" ? startNum : `0${startNum}`,
          end: endNum ? (endNum.charAt(0) === "0" ? endNum : `0${endNum}`) : "",
          line: index + 1,
          type: endNum ? "Range" : "Phonenumber"
        };
      } else {
        range = {
          start:
            startNum.charAt(0) === "+" || startNum.slice(0, 2) === "00"
              ? startNum
              : `+${startNum}`,
          end: endNum
            ? endNum.charAt(0) === "+" || endNum.slice(0, 2) === "00"
              ? endNum
              : `+${endNum}`
            : "",
          line: index + 1,
          type: endNum ? "Range" : "Phonenumber"
        };
      }
      // const range = {
      //   start:
      //     isLocalFormat && startNum.charAt(0) === "0"
      //       ? startNum
      //       : startNum.charAt(0) === "+"
      //       ? startNum
      //       : `+${startNum}`,
      //   end: endNum
      //     ? isLocalFormat && endNum.charAt(0) === "0"
      //       ? endNum
      //       : endNum.charAt(0) === "0"
      //       ? endNum
      //       : `+${endNum}`
      //     : "",
      //   line: index + 1,
      //   type: endNum ? "Range" : "Phonenumber"
      // };
      if (
        startNum &&
        isPhoneNumberCorrect(startNum) &&
        (!endNum || isPhoneNumberCorrect(endNum))
      ) {
        ok.push(range);
      } else {
        const errRow = {
          row,
          line: index + 1
        };
        err.push(errRow);
      }
    }
  });

  return { ok, err };
};
