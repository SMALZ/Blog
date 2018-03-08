var Archive =require('../lib/mongo').Archive;


module.exports = {
  insertArchive: function(archive) {
    Archive.update({label: archive.label, rank: archive.rank, author: archive.author},{$set: archive},{upsert: true}).exec();
    // }
    // return 1;
  },

  findArchive: function(author) {
    return Archive.find({ author: author }).sort({rank:-1}).exec();
  },

  findAllRankByArchive: function(author) {
    return Archive.distinct("rank").exec();
  },

  findAllRankByAuthor: function(author) {
    return Archive.find({ author: author },{ 'rank': 1 }).exec();
  },

  findAllLabelByPost: function(){
    return Post.distinct("label").exec();
  },

  updateLabel: function(archive, newLabel) {
    return Archive.update({ author: archive.author, rank: archive.rank, label: archive.label },
      { $set:{ label: newLabel} }).exec();
  },

  updateRank: function(archive, newRank) {
    return Archive.update({ author: archive.author, rank: archive.rank },
      { $set:{ rank: newRank} }).exec();
  },

  deleteLabel: function(archive) {
    return Archive.remove({ author: archive.author, rank: archive.rank, label: archive.label})
    .exec();
  },

  deleteRank: function(archive) {
    return Archive.remove({ author: archive.author, rank: archive.rank })
    .exec();
  }


}
