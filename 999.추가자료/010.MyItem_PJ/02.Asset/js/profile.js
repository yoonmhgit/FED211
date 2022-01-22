// 프로필 페이지 JS - profile.js

$(function(){ /// jQB /////////////////////

    console.log("프로필JS로딩!");


    /// 자기소개 박스에 마우스 오버시
    // 디자인쪽에 오버하면 폰이 그쪽으로 회전(-60deg)
    // 코더쪽에 오버하면 폰이 그쪽으로 회전(60deg)

    // 이벤트 대상: .showtxt
    // 이벤트 종류: mouseenter
    //      (요소의 경계선 안으로 들어갈때 발생)
    
    // 변경 대상: .iphone
    let ipn = $(".iphone");

    $(".showtxt").mouseenter(function(){

        // is()메서드로 오버된 요소의 클래스를 확인한다!
        // is(확인할선택자) 
        // -> 확인할 선택자를 조사하여 true/false를 리턴함!

        // .showtxt요소가 .dtxt인지 물어봄!
        let isit = $(this).is(".dtxt");
        // 결과적으로 디자이너쪽 박스이면 true!

        console.log("마우스엔터!"+isit);

        // 디자이너면 Y축 회전 -60deg
        if(isit){
            ipn.css({
                transform:"rotateY(-60deg) rotateX(10deg)",
                transition:"all .7s ease-in-out"
            });///// css /////
        } ///////////// if //////////
        // 코더면 Y축 회전 60deg
        else {
            ipn.css({
                transform:"rotateY(60deg) rotateX(10deg)",
                transition:"all .7s ease-in-out"
            });///// css /////
        } //////////// else ////////


    }); ///////// mouseenter 함수 ////////////

    // 마우스가 자기소개박스에서 벗어나면 Y축 0도 애니
    $(".showtxt").mouseleave(function(){
        ipn.css({
            transform:"rotateY(0deg) rotateX(10deg)",
            transition:"all .7s ease-in-out"
        });///// css /////
    });/////////// mouseleave 함수 /////////////



});////////////// jQB ////////////////////