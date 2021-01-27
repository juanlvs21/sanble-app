export default (messages: string | Array<string>): string => {
  if (Array.isArray(messages)) {
    let msg = "";

    messages.map((message: string, i: number) => {
      msg = msg + "- " + message;
      if (i < messages.length) msg = msg + "</br>";
    });

    return msg;
  } else return messages.toString();
};
