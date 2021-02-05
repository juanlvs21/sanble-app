export default (messages: string | Array<string> | Object): string => {
  if (Array.isArray(messages)) {
    let msg = "";

    for (let i = 0; i < messages.length; i++) {
      msg = msg + "- " + messages[i];
      if (i < messages.length) msg = msg + "</br>";
    }

    return msg;
  } else if (typeof messages === "object") {
    let msg = "";

    for (let i = 0; i < Object.keys(messages).length; i++) {
      msg = msg + "- " + Object.values(messages)[i].message;
      if (i < Object.keys(messages).length) msg = msg + "</br>";
    }

    return msg;
  } else return messages.toString();
};
