module.exports = {
  //  把排序好的archive处理为键值对格式
  getKeyValueArchive: (archive) => {
    var result = {};
    var tempA = '';
    var i = 0;
    var z = 0;
    for(var j = 0; j < archive.length; j++) {
      if( tempA != archive[j].rank ) {
        i = 2;
        z++;
        result['a' + z] = {};
        result['a' + z]['count'] = 0;
        result['a' + z]['rank'] = archive[j].rank;
        result['a' + z]['label1'] = archive[j].label;
      } else {
        result['a' + z]['label' + i++] = archive[j].label;
      }
      tempA = archive[j].rank;
      result['a' + z]['count'] += 1;
    }
    return result;
  },

  // 把类别与标签 放在一起,不区分
  getLabels: (labelCloud) => {
    var labels = {};
    for(var i = 0,j = 0; i < labelCloud.length; i++ ){
      labels['label' + j++] = labelCloud[i].rank;
      labels['label' + j++] = labelCloud[i].label;
    }
    return labels;
  },

  // 类别去重
  getRanks: (ranks) => {
    var newRanks = [];
    var temp = '';
    console.log(ranks);
    for(var i in ranks) {
      if(temp != ranks[i]['rank']){
        newRanks.push(ranks[i]['rank']);
        temp = ranks[i]['rank'];
      }
    }
    return newRanks;
  }
}
