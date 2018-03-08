// listCount 数据列表总数
// perPage 每页显示列表数
// pageBox 放置分页控件的容器$('')
// data 需要展示的数据  ---变化的数据，也就是后端的数据
// dataBox 放置数据的容器$('')
// sign 用去删除多余数据的标志$('') 先把数据删除在展示数据
// dataSource 固定的数据 一个函数,内容是html用于放置动态数据
var pager = {
  listCount: 10,
  perPage: 10,
  currentPage: 1,
  minPage: 1,
  maxPage: 1,
  dataBox: '',
  pageBox: '',
  sign: '',
  dataSource: '',
  initPage: (listCount, perPage, pageBox, data, dataBox, sign, dataSource) => {
    pager.listCount = listCount;
    pager.perPage = perPage;
    pager.data = data;
    pager.dataBox = dataBox;
    pager.sign = sign;
    pager.dataSource = dataSource;
    pager.maxPage = Math.ceil(listCount/perPage);
    if(pager.minPage == pager.maxPage) {
      return false;
    }
    $(pageBox).append('<ul class="pagination" id="postPagination"></ul>');
    pager.pageBox = $('#postPagination');
    console.log(pager.pageBox);

    for(var i = pager.minPage; i <= pager.maxPage; i++) {
      if( i == pager.minPage) {
        $(pager.pageBox).append('<li class="disabled"><a href="javascript:;">&laquo;</a></li>');
      }
      $(pager.pageBox).append('<li onclick="showCurrentPage(this)"><a href="javascript:;">' + i + '</a></li>');
      if( i == pager.maxPage) {
        $(pager.pageBox).append('<li onclick="showRightPage(this)"><a href="javascript:;">&raquo;</a></li>');
      }
    }
  },

  showLeftPage: (that) => {
    var btn = $(pager.pageBox).find('li:eq(' + (pager.currentPage - 1) + ')');
    showCurrentPage(btn);
  },

  showCurrentPage: (that) => {
    var selectPage = parseInt($(that).find('a').text());
    $(that).parent().children().attr('class','');
    $(that).attr('class','active');
    $(pager.dataBox).children(pager.sign).remove();
    pager.currentPage = selectPage;
    for(var i = (pager.currentPage - 1) * pager.perPage, j = 0; j < pager.perPage; j++) {
      if(!pager.data[i+j]) {
        break;
      }
      $(pager.dataBox).prepend(pager.dataSource(pager.data[i+j]));
    }

    if(pager.currentPage == pager.minPage) {
      $(pager.pageBox).find('li:eq(0)').attr('class','disabled');
      $(pager.pageBox).find('li:eq(0)').attr('onclick','');
    } else {
      $(pager.pageBox).find('li:eq(0)').attr('onclick','showLeftPage(this)');
    }

    if(pager.currentPage == pager.maxPage) {
      $(pager.pageBox).find('li:eq(' + (pager.maxPage + 1) + ')').attr('class','disabled');
      $(pager.pageBox).find('li:eq(' + (pager.maxPage + 1) + ')').attr('onclick','');
    } else {
      $(pager.pageBox).find('li:eq(' + (pager.maxPage + 1) + ')').attr('onclick','showRightPage(this)');
    }
  },

  showRightPage: (that) => {
    var btn = $(pager.pageBox).find('li:eq(' + (pager.currentPage + 1) + ')');
    showCurrentPage(btn);
  }


}

var showLeftPage = (that) => { pager.showLeftPage(that) }
var showCurrentPage = (that) => { pager.showCurrentPage(that) }
var showRightPage = (that) => { pager.showRightPage(that) }
