const client = require("./");
client.find({ id: "1" }, (error, note) => {
  if (!error) console.log(note);
  else console.error(error);
});
