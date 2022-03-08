'use strict';
// .gallery ul li 배경이미지 저장
// 반복문, 배열
const gallery = $('.gallery');
const galleryLi = $('.gallery ul li ');
const itemsLi = $('.items>ul>li');

const bgArr = [];
for (let i = 0; i < galleryLi.length; i++) {
  bgArr.push(`url(img/bg${i}.jpg) no-repeat 50%/cover`);
  galleryLi.eq(i).css({
    'background': bgArr[i]
  });
}

let i = -1;

function autoGallery() {
  if (i >= galleryLi.length - 1) i = -1;
  i++;
  autoFn(i);
  /*
    // const gap=galleryLi.eq(1).offset().left-galleryLi.eq(0).offset().left;
    // const goto=(-i*gap); //animate이용   
    // gallery.animate({left:goto},400);
    // itemsLi.eq(i).addClass('on').siblings().removeClass('on');
  */
  if (i >= galleryLi.length - 1) i = -1;
}
// 3초마다 autoGallery함수를 실행, setInterval이용
let setIn = setInterval(autoGallery, 3000);

const spanArrow = $('span.arrow');
spanArrow.hover(
  function () {
    clearInterval(setIn);
  },
  function () {
    setIn = setInterval(autoGallery, 3000);
  }
);

// 클릭 index 0 -> 왼쪽, index 1-> 오른쪽
spanArrow.off('click').on('click', function () {
  const idx = $(this).index();
  if (idx == 0) {
    if (i >= galleryLi.length - 1) i = -1;
    i++;
    autoFn(i);
    /*
      // const gap=galleryLi.eq(1).offset().left-galleryLi.eq(0).offset().left;
      // const goto=(-i*gap);    
      // itemsLi.eq(i).addClass('on').siblings().removeClass('on');
      // gallery.animate({left:goto},400);
    */
  } else if (idx == 1) {
    if (i <= 0) i = galleryLi.length;
    i--;
    autoFn(i);
    /*
      // const gap=galleryLi.eq(1).offset().left-galleryLi.eq(0).offset().left;
      // const goto=(-i*gap);
      // itemsLi.eq(i).addClass('on').siblings().removeClass('on');    
      // gallery.animate({left:goto},400);
    */
  }
});


itemsLi.hover(
  function () {
    clearInterval(setIn);
  },
  function () {
    setIn = setInterval(autoGallery, 3000);
  }
);

itemsLi.on('click', function () {
  const idx = $(this).index();
  console.log(idx);
  i = idx;
  autoFn(i);
  /*
    `// const gap = galleryLi.eq(1).offset().left - galleryLi.eq(0).offset().left;
    // const goto = (-i * gap);
    // itemsLi.eq(i).addClass('on').siblings().removeClass('on');
    // gallery.animate({
      //   left: goto
      `// }, 400);
   */
});

function autoFn(idx2) {
  const gap = galleryLi.eq(1).offset().left - galleryLi.eq(0).offset().left;
  const goto = (-idx2 * gap);
  itemsLi.eq(idx2).addClass('on').siblings().removeClass('on');
  gallery.animate({
    left: goto
  }, 400);
}

(() => {
  autoGallery();
})();