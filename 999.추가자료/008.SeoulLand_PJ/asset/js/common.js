// 서울랜드 공통 JS - common.js //////////

/*//////////////////////////////////////////
    함수명: showGNB
    기능: .gnbbx에 클래스 on을 넣거나 빼준다
*/ //////////////////////////////////////////
function showGNB(gubun) {
    // gubun-오버/아웃시 구분값 전달변수(1-오버시/0-아웃시)
    // 1. 함수호출확인
    // console.log("GNB배경보여!" + gubun);

    // 2. 변경대상: .gnbbx (GNB배경박스)
    var tg = document
        .getElementsByClassName("gnbbx").item(0);
    // 클래스를 불러올땐 반드시 순번 item(순번)을 써야함!

    // 3. 변경내용: 
    // 대상에 클래스 "on"을 오버시엔 넣고 아웃시엔 뺀다!

    if (gubun) tg.classList.add("on");
    // if(gubnu===1) 1값은 true이므로 안써도됨!
    // if문의 실행문이 하나일 경우 중괄호{} 생략가능!

    else tg.classList.remove("on");
    // else는 if조건이 아닌경우임. 지금은 gubun값이 0인경우

    // if문 없이 클래스"on"이 없으면 넣고 있으면 빼는 
    // toggle메서드 사용할 수 있음!
    //tg.classList.toggle("on");

    /* 
        [ JS에서 클래스 넣고 빼기 메서드 ]
        classList 객체
        1) add(클래스명) : 클래스넣기
        2) remove(클래스명) : 클래스빼기
        3) toggle(클래스명) : 없으면 넣고 있으면 뺌
    */

} //////////// showGNB 함수 //////////////////
//////////////////////////////////////////////

$(function () { ////// jQB //////////////////////

    ///// 패밀리사이트 연결하기 ///////
    // 대상: #fslink
    // 이벤트: change
    //       -> select박스의 선택 option이 변경될때
    // 제이쿼리 change 이벤트 메서드 -> change()
    $("#fslink").change(function () {

        // 1.변경 선택된 option value값 읽기
        let optval = $(this).val();
        // val() 메서드 : 선택 옵션의 value값 읽어옴!
        console.log("선택값:" + optval);

        // 2. 옵션값이 "fs"이면 돌아가기!
        if(optval==="fs") return;

        // 3.옵션값에 따라 이동할 url변수에 할당하기
        let url;
        switch (optval) {
            case "cal":
                url = "http://www.icpk.co.kr/";
                break;
            case "rose":
                url = "http://www.irosehill.co.kr/";
                break;
        } //////// switch case문 /////////

        console.log("URL값:"+url);

        // 4. 페이지 새창으로 열기
        window.open().location.href = url;
        // window.open() 새창열기
        // location.href = 페이지주소 -> 페이지이동


    }); /////////// change함수 ///////////////////


    /////////// 모바일 메뉴 클릭시 전체메뉴 보이기 /////////
    // 이벤트 대상: #ham
    // 변경 대상: #ham, .mgnb
    // 변경 내용: 햄버거 버튼에 class="on" 넣기/빼기 -> toggleClass()
    //          + 모바일 전체 메뉴 fadeIn/fadeOut -> fadeToggle()
    $("#ham").click(function(){
        
        // 1. 클릭된 햄버거 버튼에 클래스 넣기/빼기
        $(this).toggleClass("on");
        // 2. 모바일 전체메뉴 서서히 보이기/숨기기
        $(".mgnb").fadeToggle(600);

    });////////// click ///////////////////





}); ///////////////////// jQB ///////////////////////////