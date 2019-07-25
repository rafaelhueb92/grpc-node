const client = require("./");
client.list({}, (error, notes) => {
  if (!error) {
    console.log("successfully fetch List notes");
    console.log(notes);
  } else {
    console.log("erro");
    console.error(error);
  }
});
