// Request-Kindle-Edition by @izawak

rke = new RegExp("/request-kindle-edition/");
req = false;

if(!document.URL.match(rke)){
  var reqTag = request_tag();
  if(reqTag){
    var bookId = RegExp.$1;
    var reqURL = reqTag.href;

    reqTag.innerHTML = "あなたの忠実なSafari機能拡張がこの本を勝手にKindle化リクエストしています…。";
    req = new XMLHttpRequest();
    req.open('GET', reqURL, true);
    req.onreadystatechange = requesting;
    req.send(null);

    console.log(bookId);
  }
}

function request_tag()
{
  var allLinks = document.getElementsByTagName("a");
  var a;
  for(i = 0; i < allLinks.length; i++){
    a = allLinks[i];
    if(a.href.match(rke) && a.href.match(/a=(\d+)/)){
      return a;
    }
  }
  return false;
}

function requesting()
{
  if(req.readyState == 4){
    var mes;
    if(req.status == 200){
      mes = "あなたの忠実なSafari機能拡張がこの本を勝手にKindle化リクエストしておきました。";
    } else {
      mes = "あなたの忠実なSafari機能拡張がこの本を勝手にKindle化リクエストしようとしたのですが失敗したようです(" + req.status + ")。";
    }
    var reqTag = request_tag();
    if(reqTag){
      reqTag.innerHTML = mes;
      console.log(req.status);
    }
  }
}
