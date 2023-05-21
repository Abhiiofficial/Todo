const mongoose = require('mongoose')
const moment = require('moment')

const TodoSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  todoTitle: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false, });

TodoSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    const createdAt = moment(ret.createdAt);
    const updatedAt = moment(ret.updatedAt);

    const now = moment();
    const createdAgo = createdAt.from(now)
    const updatedAgo = updatedAt.from(now)

    ret.createdAt = {
      date: createdAt.format('DD/MM/YYYY , HH:mm'),
      ago: createdAgo.replace('minutes', 'min').replace('seconds', 's')
    };

    ret.updatedAt = {
      date: updatedAt.format('DD/MM/YYYY , HH:mm'),
      ago: updatedAgo.replace('minutes', 'min').replace('seconds', 's')
    };

    return ret;
  }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;