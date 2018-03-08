
  var tAreaNumber = document.getElementById('c-textarea-number'),
      tAreaContent = document.getElementById('c-textarea-content'),
      tAreaBg = document.getElementById('c-textarea-bg');
      tAreaC1 = document.getElementById('c-textarea-nbr1');
      tAreaC2 = document.getElementById('c-textarea-nbr2');

  var rFDC = () => {
    var c = '',
        i = 0,
        n = 1,
        valNumber = '',
        addWidth = 999,
        content = tAreaContent.value? tAreaContent.value : '';
    for(; i < content.length; i++) {
       if(content.substr(i,1) == '\n') {
         n++;
       }
    }

    var temp1 = new Array()
        j = 1;
        temp = n;
    temp1[0] = temp.toString().length;
    console.log(temp1[0]);

    for(i = temp1[0]; i > 1; i--) {
      for(j = 1; j < i; j++) {
        temp1[j] = (temp1[j]?temp1[j]:'') + '  ' ;
      }
    }

    console.log(temp1);
    j = 1;
    for(i = 1; i <= n; i++) {
        j = ((i == Math.pow(10,j))? j+1:j);
        if(i < Math.pow(10,j)) {
          valNumber = valNumber + (temp1[j]? temp1[j]: '') + i + '\n';
      }
    }

    if(0 < n && n < addWidth) {

    } else {
      tAreaContent.style.left =  (2.5 + 1 * (n.toString().length - 3)) + '%';
      tAreaC2.style.left =  (2.5 + 1 * (n.toString().length - 3)) + '%';

      tAreaContent.style.width = (97.5 - 1 * (n.toString().length - 3)) + '%';
      tAreaC2.style.width = (97.5 - 1 * (n.toString().length - 3)) + '%';
      addWidth = addWidth + 900 * Math.pow(10,(n.toString().length - 3));
      // tAreaC1.style.marginLeft = ( 5 * n.toString().length - 3) + 'px';
    }
    // console.log(valNumber);
    tAreaNumber.innerText = valNumber;
    tAreaNumber.scrollTop = tAreaContent.scrollTop;
    // tAreaContent.scrollTop = tAreaNumber.scrollTop;
  };


  tAreaContent.addEventListener('mousewheel',() => {
    tAreaNumber.scrollTop = tAreaContent.scrollTop;
  });



  var reflashDefCon =  () => {
      // setInterval(rFDC(),10);
      rFDC();
  };



  function addRankInput() {
    var rankC = document.getElementById('rank-choose');
    rankC.value = '';
    rankC.disabled = false;
    rankC.setAttribute('placeholder','请输入新增类别');
  }

  var archivFixCon = document.getElementById('archives-content').innerHTML;

  function labelUse(that) {
    document.getElementById('rank-choose1').value = document.getElementById('rank-choose').value;
    document.getElementById('list-label').disabled = (that.value == ''? true:false);
    var arCn = document.getElementById('archives-content');
    var aL = document.getElementById('archive-list').value;
    aL = aL.match(/[^-]+(?=-)/mg);
    var labelL = new Array();
    // console.log(aL,that.value);
    for(var i = 0; i < aL.length; i = i + 2) {
      if(aL[i] == that.value) {
        labelL += '<li id="select-label" onclick="selectLabel(this)"><a href="#">' + aL[i+1] + '</a></li>';
      }
    }
    // console.log(arCn.innerHTML);
    arCn.innerHTML = labelL + archivFixCon;
    // console.log(arCn.innerHTML);
    // console.log(labelL);
  }

  function selectRank(that) {
    // console.log(that.firstChild.innerHTML);
    var rC = document.getElementById('rank-choose');
    rC.value = that.firstChild.innerHTML;
    labelUse(rC);
  }

  function selectLabel(that) {
    document.getElementById('label-choose').value = that.firstChild.innerHTML;
    document.getElementById('label-choose').disabled  = false;
    document.getElementById('list-rank').disabled = true;
    document.getElementById('rank-choose').disabled = true;
  }

  function clearRankContent() {
    var rankC = document.getElementById('rank-choose');
    rankC.value = '';
    rankC.disabled = true;
    rankC.setAttribute('placeholder','');
    clearLabelContent();
    document.getElementById('list-rank').disabled = false;
    document.getElementById('list-label').disabled = true;
  }

  function addLabelInput() {
    var labelC = document.getElementById('label-choose');
    labelC.value = '';
    labelC.disabled = false;
    labelC.setAttribute('placeholder','请输入新增标签');
    document.getElementById('list-rank').disabled = true;
    document.getElementById('rank-choose').disabled = true;
  }

  function clearLabelContent() {
    var rankL = document.getElementById('label-choose');
    rankL.value = '';
    rankL.disabled = true;
    rankL.setAttribute('placeholder','');
  }





  function Tfocus(title) {
    // console.log(title.parentNode.children);
    var temp1 = title.parentNode.children;
    for(var i = 0; i < temp1.length; i++) {
      console.log(temp1[i]);
      temp1[i].style.backgroundColor = '#fff';
      temp1[i].style.borderLeft = '2px solid #fff';
      temp1[i].firstChild.style.color = '#000';
    }
    title.style.backgroundColor = '#f3f3f3';
    title.style.borderLeft = '2px solid #4fc08d';
    title.firstChild.style.color = '#4fc08d';
    title.firstChild.click();
  }

  var Tfocus = () => {
    alert('aa');
  }

  function showCommentIconEdit(that){
    // console.log(that.children.length,that.children[1].children[3]);
    // that.children[1].children[3].children[0].children[0].style.display = 'inline-block';
    // that.children[1].children[3].children[1].children[0].style.display = 'inline-block';
    var iconIdSign = that.getAttribute('id').match(/[0-9]+/);
    var iconIdE = 'comment-icon' + iconIdSign;
    var iconBox = document.getElementById(iconIdE);
    // console.log(iconIdSign,iconIdE,iconBox);
    if(iconBox != null) {
      for(var i = 0; i < iconBox.children.length; i++) {
        iconBox.children[i].children[0].style.display = 'inline-block';
      }
    }
  }


  function hiddenCommentIconEdit(that) {
    var iconIdSign = that.getAttribute('id').match(/[0-9]+/);
    var iconIdE = 'comment-icon' + iconIdSign;
    var iconBox = document.getElementById(iconIdE);
    // console.log(iconIdSign,iconIdE,iconBox);
    if(iconBox != null) {
      for(var i = 0; i < iconBox.children.length; i++) {
        iconBox.children[i].children[0].style.display = 'none';
      }
    }
  }

  function commentEdit(that) {
    var sign = that.getAttribute('id').match(/[0-9]+/);
    var commentEdit = document.getElementById('comment-content' + sign);
    var subCedit = document.getElementById('sub-comment-content' + sign);
    var btnCE = document.getElementById('btn-comment-edit' + sign);
    commentEdit.setAttribute('class','hidden');
    subCedit.setAttribute('class','');
    subCedit.children[0].value = commentEdit.innerHTML;
    var btnCEClass = btnCE.getAttribute('class').replace(/hidden/,'');
    btnCE.setAttribute('class',btnCEClass);
    // var commentEdit = that.parentNode.nextElementSibling;
    // commentEdit.setAttribute('class','hidden');

  }


  function cancelEdit(that) {
    var sign = that.getAttribute('id').match(/[0-9]+/);
    var commentEdit = document.getElementById('comment-content' + sign);
    var subCedit = document.getElementById('sub-comment-content' + sign);
    var btnCE = document.getElementById('btn-comment-edit' + sign);
    commentEdit.setAttribute('class','');
    subCedit.setAttribute('class','hidden');
    subCedit.querySelector('textarea').setAttribute('style','');
    subCedit.querySelector('#errorECSign')? subCedit.querySelector('#errorECSign').remove() : '';
    subCedit.children[0].value = '';
    var btnCEClass = btnCE.getAttribute('class') + 'hidden';
    btnCE.setAttribute('class',btnCEClass);
  }


  function commentReply(that) {
    that = that.parentNode;
    var comCla = that.nextElementSibling.nextElementSibling.nextElementSibling.getAttribute('class').replace(/hidden/,'');
    var replyCommentCla = that.nextElementSibling.nextElementSibling.getAttribute('class').replace(/hidden/,'');
    var comRes = new Array();
    comRes = document.querySelectorAll('form#comRe');
    // console.log(comCla,comRes,comRes.length);
    for (var i = 0; i < comRes.length; i++) {
      // console.log(document.getElementById('comRe')[i].parentNode);
      comRes[i].setAttribute('class',comCla + 'hidden');
    }
    that.nextElementSibling.nextElementSibling.nextElementSibling.setAttribute('class',comCla);
    that.nextElementSibling.nextElementSibling.setAttribute('class',replyCommentCla);
  }


  function showReplyIcon(that) {
    if(that.querySelector('a#reply-icon-edit')) {
      that.querySelector('a#reply-icon-edit').style.display = 'inline-block';
    }
    if(that.querySelector('a#reply-icon-remove')) {
      that.querySelector('a#reply-icon-remove').style.display = 'inline-block';
    }
    that.querySelector('a#zanI2').style.display = 'inline-block';
  }

  function showReplyIcon1(that) {
    that.querySelector('a#zanI2').style.display = 'inline-block';
  }


  function hiddenReplyIcon(that) {
    if(that.querySelector('a#reply-icon-edit')) {
      that.querySelector('a#reply-icon-edit').style.display = 'none';
    }
    if(that.querySelector('a#reply-icon-remove')) {
      that.querySelector('a#reply-icon-remove').style.display = 'none';
    }
    that.querySelector('a#zanI2').style.display = 'none';
  }


  function commentReplyEdit(that) {
    var subCRCs = document.querySelectorAll('form#subCRC');
    var crcs = document.querySelectorAll('p#crc');

    for(var i = 0; i < subCRCs.length; i++) {
      subCRCs[i].setAttribute('class','hidden');
      subCRCs[i].querySelector('textarea').setAttribute('style','');
      subCRCs[i].querySelector('#errorERCSign')? subCRCs[i].querySelector('#errorERCSign').remove() : '';
      crcs[i].style.display = 'block';
      subCRCs[i].parentNode.querySelector('button#commentRC').style.visibility = 'hidden';
      subCRCs[i].parentNode.querySelector('button#commentRS').style.visibility = 'hidden';
      subCRCs[i].parentNode.parentNode.setAttribute('onmouseover','showReplyIcon(this)');
    }

    var subCRC = that.parentNode.parentNode.querySelector('form#subCRC');
    var crc = subCRC.parentNode.querySelector('p#crc');

    subCRC.parentNode.parentNode.setAttribute('onmouseover','showReplyIcon1(this)');
    that.style.display = 'none';
    that.nextElementSibling.style.display = 'none';

    subCRC.setAttribute('class','');
    crc.style.display = 'none';
    subCRC.children[0].value = crc.innerHTML;

    that.nextElementSibling.nextElementSibling.style.visibility = 'visible';
    that.nextElementSibling.nextElementSibling.nextElementSibling.style.visibility = 'visible';
    // console.log(crc.innerHTML);

  }

  function cancelReplyEdit(that) {
    that.parentNode.parentNode.querySelector('p#crc').style.display = 'block';
    var formBox = that.parentNode.parentNode.querySelector('form#subCRC');
    formBox.querySelector('textarea').setAttribute('style','');
    formBox.querySelector('#errorERCSign')? that.parentNode.parentNode.querySelector('#errorERCSign').remove() : '';
    formBox.setAttribute('class','hidden');


    console.log(that,that.previousElementSibling);
    that.previousElementSibling.style.visibility = 'visible';
    that.previousElementSibling.previousElementSibling.style.visibility = 'visible';
    that.style.visibility = 'hidden';
    that.nextElementSibling.style.visibility = 'hidden';
    that.parentNode.parentNode.parentNode.setAttribute('onmouseover','showReplyIcon(this)');
  }
