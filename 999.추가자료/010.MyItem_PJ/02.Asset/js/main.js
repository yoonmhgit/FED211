// 마이아이템 메인 JS - main.js

$(function () { /// jQB ////////////////////

    console.log("메인로딩!");

    /////////////////////////////////////
    // 메인 썸네일이미지에 마우스 오버시 // 
    // 메인 큰이미지 변경하기 ////////////
    // 이벤트 대상 : .thumbs img
    // 이벤트 : mouseover
    // 변경 대상 : .mibx img
    // 변경 원리 : 마우스 오버된 썸네일 이미지 경로를 읽어와서
    //            큰 이미지에 small 이라는 폴더 경로만 지우고
    //            새로운 경로를 만들어서 큰 이미지 src를 변경
    $(".thumbs img").mouseover(function () {

        // console.log("오버~!");

        // 1. 썸네일 이미지 경로 알아내기
        let isrc = $(this).attr("src");
        // 이미지 경로중 "/small" 없애기 : replace(바꿀값,바뀔값)
        isrc = isrc.replace("/small", "");
        // console.log("경로:"+isrc);

        // 2. 변경된 썸네일 이미지 경로를 메인이미지에 적용!
        // 변경 대상: .mibx img
        $(".mibx img").attr("src", isrc);

    }); ////////// mouseover //////////////////

    /// 썸네일 클릭시 아이템 페이지 이동하기 ///
    // 대상: .thumbs a
    $(".thumbs a").click(function (e) {
        // e - 이벤트전달변수
        e.preventDefault();

        // 1. 하위의 이미지 alt 속성값 읽어오기
        let val = $("img", this).attr("alt");
        console.log(val);

        // 2. 페이지 이동하기
        // 이동할 페이지: item.html?itm=전달값
        // 전달값은 메뉴명과 같은 이미지의 alt값
        // 한글을 보낼때 escape처리할것!
        location.href = "item.html?itm=" + escape(val);

    }); //////////// click ////////////////


}); ///////////// jQB ////////////////////