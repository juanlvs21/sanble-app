export default (messages: string | Array<string>): string => {
  if (Array.isArray(messages)) {
    let msg = "";

    for (let i = 0; i < messages.length; i++) {
      msg = msg + "- " + messages[i];
      if (i < messages.length) msg = msg + "</br>";
    }

    return msg;
  } else return messages.toString();
};
