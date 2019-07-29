const isNumber = phoneNumber => {
  return !isNaN(parseFloat(phoneNumber)) && !isNaN(phoneNumber - 0);
};

const isPhoneNumberCorrect = phoneNumber => {
  if (isNumber(phoneNumber)) {
    return true;
  }
  return false;
};

export const parseNumbersString = str => {
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
      const range = {
        start:
          startNum.charAt(0) === "0" || startNum.charAt(0) === "+"
            ? startNum
            : `+${startNum}`,
        end: endNum
          ? endNum.charAt(0) === "0" || endNum.charAt(0) === "+"
            ? endNum
            : `+${endNum}`
          : "",
        line: index + 1,
        type: endNum ? "Range" : "Phonenumber"
      };
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
