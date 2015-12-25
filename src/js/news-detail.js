var $ = require('jquery');

var share = null;
nie.use(["nie.util.shareV5"],function(){
  share = nie.util.share({
    fat:"#NIE-share",
    type:1,
    defShow:[23,22,2,1,4],
    title:null,
    url:null,
    img:null,
    content:null,
    product:""
  });
  $(".NIE-share-txt").hide();
});
