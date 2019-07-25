const client = require("./");
let updateNote = {
  id: "1",
  title: "New Note id 1",
  content: "New Note content"
};

client.update(updateNote, (error, note) => {
  if (!error) {
    console.log("The Note was updated successfully", note);
  } else {
    console.error(error);
  }
});
