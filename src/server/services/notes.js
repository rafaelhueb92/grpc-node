const grpc = require("grpc");
const uuidv1 = require("uuid/v1");
const notesProto = grpc.load("./src/protos/notes.proto");

const notes = [
  { id: "1", title: "Note 1", content: "Content 1" },
  { id: "2", title: "Note 2", content: "Content 2" }
];

module.exports = {
  noteService: notesProto.NoteService.service,
  services: {
    list: (_, callback) => {
      callback(null, notes);
    },
    find: (call, callback) => {
      callback(null, notes.find(n => n.id == call.request.id));
    },
    insert: (call, callback) => {
      let note = { ...call.request, id: uuidv1() };
      notes.push(note);
      callback(null, note);
    },
    update: (call, callback) => {
      let existingNote = notes.find(n => n.id == call.request.id);
      if (existingNote) {
        existingNote.title = call.request.title;
        existingNote.content = call.request.content;
        callback(null, existingNote);
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "Not found"
        });
      }
    },
    delete: (call, callback) => {
      let existingNoteIndex = notes.findIndex(n => n.id == call.request.id);
      if (existingNoteIndex != -1) {
        notes.splice(existingNoteIndex, 1);
        callback(null, {});
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "Not found"
        });
      }
    }
  }
};
