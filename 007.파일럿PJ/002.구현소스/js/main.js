// 파일럿 PJ 메인 JS - main.js

$(function () { ///// jQB ////////////////////////

    // 모바일일때 메인페이지 등장액션 클래스 지우기
    if(mob) $(".act").removeClass("act");
    // mob는 autoScroll.js에서 모바일일때 1을 넣어줌


    //////////////////////////////////////
    // 상단메뉴 클릭시 페이지 이
    //////////////////////////////////////
    // 대상 : .gnb a
    $(".gnb a").click(function (e) {

        // 1. 기본이동막기
        e.preventDefault();

        ///////////////////////////////////////////////////////////////////////////////
        ///// 2. 클릭된 a의 부모 li순번 알아내기                                   /////
        ///// 유의사항 : 첫번째 li가 안보이도록 있어서 페이지 순번과 정확히 일치함!  /////
        ///////////////////////////////////////////////////////////////////////////////
        let idx = $(this).parent().index();
        // console.log("순번:"+idx);

        // 중요!!
        //  pno에 idx 넣기!!
        pno = idx;

        ///////////////////////////////////////////////
        // 3. 이동할 페이지(.page)의 위치값 알아내기 ///
        ///////////////////////////////////////////////

        ////////////////////////////////////////////////////
        // 새로운 페이지 위치값 : 윈도우 높이값 * 페이지순번 //
        let pos = $(window).height() * pno;
        ///////////////////////////////////////////////////

        //console.log("이동위치:" + pos);

        ////////////////////////////////////////////////
        // 4. 실제 이동위치로 스크롤 애니메이션 하기 ////
        ///////////////////////////////////////////////

        $("html,body").stop().animate({
            scrollTop: pos + "px"
        }, 1200, "easeOutQuint");

        // animate 콜백함수가 아닌 바깥에서 호출하면 페이지 액션이 출발과 동시에 작동된다!
        pageAction();

        ///////////////////////////////////////////////
        // 5. 페이지번호(pno)에 맞는 GNB 메뉴 변경하기 //
        ///////////////////////////////////////////////
        // 변경대상: .gnb li, .indic li
        $(".gnb li").eq(pno).addClass("on")
            .siblings().removeClass("on");
        $(".indic li").eq(pno).addClass("on")
            .siblings().removeClass("on");
        // 선택된 li 이외의 li형제들 class="on"제거하기

    });




    /////////////////////////////////
    /// 배너 드래그 기능 구현하기 ////
    /////////////////////////////////
    // 드래그 대상: .slide
    let slide = $(".slide");

    // 드래그 기능주기 -> 제이쿼리UI 기능!
    slide.draggable({
        axis: "x" /// x축고정
    }); ////// draggable ///////

    /* 
        배너 드래그 이동의 기준:
        1. 현재 슬라이드의 left:-100% 값을 기준으로 판단함
        2. 오른쪽에서 들어오는 이동 -> left: -110% 보다 작을때
        3. 왼쪽에서 들어오는 이동 -> left: -90% 보다 클때
        4. 제자리로 돌아가는 이동 -> left가 -110%보다 크고 -90%작을때

        -> 구현상 유의사항: 실제로 이동시엔 px단위로 이동함
        따라서 %를 px로 변환해 줘야한다!
        예시) 가로크기: 1000px -> left: -100% -> left : -1000px
            left: -110% -> left: -(1000*1.1) + "px"
            left: -90% -> left: -(1000*0.9) + "px"
    */


    // 윈도우 가로크기 구하는함수
    let awin = () => $(window).width();
    //// awin함수 ////
    // 화살표함수 뒤에 중괄호{} 없이 명령문 하나만 있으면
    // 그게 바로 return 문이다! -> 함수호출한 곳으로 가져감!

    // 윈도우 가로크기
    let win = awin();

    // 화면크기변경(resize)시 윈도우 가로크기 업데이트!
    $(window).resize(() => {
        win = awin();
        // console.log("윈도가로:"+win);
    }); /////// resize ///////

    // console.log("윈도가로:"+win);

    // 현재 슬라이드 위치값 구하기
    // 슬라이드 위치값
    let spos;
    // 이징변수
    let easing = "easeOutQuint";
    // 화면커버(광드래그막기)
    let cover = $(".cover");
    // 슬라이드 순번 변수
    let sno = 0; // 첫슬라이드는 0번(블릿li순번도 0번부터!)
    // 블릿요소
    let indic = $(".bindic li");
    // 슬라이드개수
    let scnt = slide.find("li").length;
    // console.log("슬수:"+scnt);

    // 자동넘김지우기는 드래그시작이벤트(dragstart)에서 해줘야 미리 끊어줄 수 있다~!
    slide.on("dragstart", () => {
        clearAuto();
    });

    // 대상: .slide -> slide변수
    // 이벤트: dragstop -> 드래그가 끝날때
    slide.on("dragstop", function () {

        // 자동넘김 지우기
        clearAuto();

        // 광드래그 막기 커버보이기
        cover.show();

        // 슬라이드 위치값 구하기
        spos = slide.offset().left;
        // offset().left 화면 왼쪽기준선 left위치
        console.log("슬위:" + spos);

        /////////// 이동구현하기 /////////////
        /// 1. 오른쪽에서 들어오는 이동 ///////
        //   -> 슬라이드 left값이 -110% 보다 작을때
        //     -110% 구하기 -> -win*1.1
        if (spos < -win * 1.1) {

            // 슬라이드가 -200%위치로 이동한다!
            // stop() 메서드는 animate가 큐에 쌓이는 것을 막는다!
            slide.stop().animate({
                left: -win * 2 + "px"
            }, 600, easing, function () { // 콜백함수(이동후)
                // 변경대상: .slide -> slide변수
                slide
                    // 첫번째 슬라이드li를 맨뒤로 보내기
                    .append(slide.find("li").first())
                    // 이때 left값을 -100%위치로 고정해야함!
                    .css({
                        left: -win + "px"
                    });

                // 광드래그 커버 지우기
                cover.hide();

                // 배너글자 등장함수 호출!
                showTxt();
                // 아랫쪽의 sno변경이 먼저이루어짐!

            }); ///////// animate /////////

            // 블릿순번변경하기 : 오른쪽이동은 증가!
            sno++;
            // 한계수 : 슬라이드 수와 같아지면 첫번호로!
            if (sno === scnt) sno = 0;
            // 블릿변경함수 호출
            chgIndic();

        } /////// if문 : -110% 보다 작을때 ////

        /// 2. 왼쪽에서 들어오는 이동 ////////////
        //   -> 슬라이드 left값이 -90% 보다 클때
        //     -90% 구하기 -> -win*0.9
        else if (spos > -win * 0.9) {

            // 슬라이드가 0위치로 이동한다!
            slide.stop().animate({
                left: "0px"
            }, 600, easing, function () { // 콜백함수(이동후)
                // 대상: .slide -> slide변수
                slide
                    // 맨뒤의 슬라이드li를 맨앞으로 이동
                    .prepend(slide.find("li").last())
                    // left값을 원래 위치인 -100%로 변경
                    .css({
                        left: -win + "px"
                    });

                // 광드래그 커버 지우기
                cover.hide();

                // 배너글자 등장함수 호출!
                showTxt();
                // 아랫쪽의 sno변경이 먼저이루어짐!

            }); ///////// animate /////////

            // 블릿순번변경하기 : 왼쪽이동은 감소!
            sno--;
            // 한계수 : -1이되면 마지막번호로!(슬개수-1)
            if (sno === -1) sno = scnt - 1;
            // 블릿변경함수 호출
            chgIndic();


        } /////// else if문 : -90% 보다 클때 ////

        // 3. 사이범위 일때 제자리로 돌아오기 //////
        // -110% < 범위 < -90% 
        else {
            // 슬라이드가 원위치로 돌아옴!
            slide.stop().animate({
                left: -win + "px"
            }, 300, easing, function () { // 콜백함수(이동후)

                // 광드래그 커버 지우기
                cover.hide();

            }); ///////// animate /////////

        } ///////// else문 : 사이범위 ////////////


    }); //////////////// drag ////////////////////
    //////////////////////////////////////////////

    // 블릿변경함수 ////////////////////////////
    let chgIndic = () => {
        // 블릿변경하기 : .bindic li -> indic변수
        indic.eq(sno).addClass("on")
            .siblings().removeClass("on");
        // console.log("블순:"+sno);
    }; ///////////// chgIndic함수 ///////////// 

    //// 배너등장텍스트 ////
    let banTxt = [
        "Men's Season<br>Collection",
        "2021 Special<br>Collection",
        "GongYoo<br>Collection",
        "T-Shirt<br>Collection",
        "Shoes<br>Collection",
        "Wind Jacket<br>Collection",
    ];

    //////////// 배너글자 등장 함수 /////////////////
    let showTxt = () => {

        // console.log("슬순:"+sno);

        // 0. 있을 수 있는 .btit박스 지우기!
        $(".btit").remove();

        // 1. 배너글자 박스 넣기
        // 대상: .slide li -> 항상 두번째 슬라이드임!
        slide.find("li").eq(1)
            .append('<h2 class="btit"></h2>');


        // 배너화면 구성상 왼쪽과 오른쪽으로 글자위치조정
        // sno 순번 1,2 만 오른쪽
        // left value 즉, left값을 변수로 처리!
        let lval = "30%"; // 왼쪽설정값
        if (sno === 1 || sno === 2) lval = "70%"; //오른쪽설정값

        // 2. 배너글자박스 CSS
        $(".btit") // 주인공!
            .css({
                position: "absolute",
                top: "55%", //아래쪽으로 살짝내려감!(올라올예정!)
                left: lval, //변수로처리!
                transform: "translate(-50%,-50%)",
                font: "bold 4.5vmax Verdana",
                color: "#fff",
                textShadow: "1px 1px 3px #777",
                whiteSpace: "nowrap",
                opacity: 0 //투명도(문자형/숫자형모두가능)
            }) /////// css /////////
            // 3. 글자넣기 - 주인공에서 이어짐!
            .html(banTxt[sno])
            // 4. 애니메이션 등장하기 - 주인공에서 이어짐!
            .animate({
                top: "50%",
                opacity: 1
            }, 1000, "easeInOutQuart");


        // console.log(banTxt[sno]);

    }; //////////// showTxt 함수 /////////////////
    //////////////////////////////////////////////

    // 배너텍스트 등장함수 최초호출!
    showTxt();


    ////////////////////////////////////////////
    // 배너자동 넘기기 함수 : 오른쪽에서 들어옴!//
    ////////////////////////////////////////////
    let goSlide = () => {

        // 광드래그 막기 커버보이기
        cover.show();

        // 슬라이드가 -200%위치로 이동한다!
        // stop() 메서드는 animate가 큐에 쌓이는 것을 막는다!
        slide.stop().animate({
            left: -win * 2 + "px"
        }, 600, easing, function () { // 콜백함수(이동후)
            // 변경대상: .slide -> slide변수
            slide
                // 첫번째 슬라이드li를 맨뒤로 보내기
                .append(slide.find("li").first())
                // 이때 left값을 -100%위치로 고정해야함!
                .css({
                    left: -win + "px"
                });

            // 광드래그 커버 지우기
            cover.hide();

            // 배너글자 등장함수 호출!
            showTxt();
            // 아랫쪽의 sno변경이 먼저이루어짐!

        }); ///////// animate /////////

        // 블릿순번변경하기 : 오른쪽이동은 증가!
        sno++;
        // 한계수 : 슬라이드 수와 같아지면 첫번호로!
        if (sno === scnt) sno = 0;
        // 블릿변경함수 호출
        chgIndic();

    }; /////////// goSlide함수 ////////////////
    ///////////////////////////////////////////

    // 인터발용변수 : 지우기용
    let autoI;

    ////////////////////////////////////////////
    ////////// 자동인터발호출 함수 /////////////
    ///////////////////////////////////////////
    let autoSlide = () => {
        autoI = setInterval(goSlide, 2500);
        // 2.5초간격으로 goSlide함수를 호출!
    }; ///////// autoSlide함수 /////////////////

    // 인터발 최초호출!
    autoSlide();

    // 타임아웃용변수 : 지우기위함
    let autoT;

    ////////////////////////////////////////////////
    //////// 인터발지우기함수 + 안건들면 다시호출 ////
    ////////////////////////////////////////////////
    let clearAuto = () => {
        // 1.인터발지우기
        clearInterval(autoI);
        // 2.타임아웃지우기(실행쓰나미방지!)
        clearTimeout(autoT);
        // 3.일정시간뒤 다시 인터발호출!
        autoT = setTimeout(autoSlide, 3000);
        // 3초동안 기다렸다가 다시 인터발함수호출!
    }; //////// clearAuto함수 //////////////////////




}); /////////////// jQB ////////////////////////


/*////////////////////////////////////////////// 
    함수명 : pageAction
    기능 : 페이지 도착시 등장액션하기
    구현방법 : 클래스를 해당요소에 주기
    페이지구분 : pno 페이지번호 변수사용!
    변경대상 : .page
*/ //////////////////////////////////////////////
// 선언,제어 함수는 ;세미콜론 안씀(에러남)
function pageAction() {

    // .page 중 순번에 맞게 선택후 자손중 .act를 찾아 클래스 "on"을 주시오!
    $(".page").eq(pno).find(".act").addClass("on");
    // .act가 여러개여도 클래스를 모두에게 줌~!!~!
    // 제이쿼리 내부적으로 for문을 돌려줌

} //////////////// pageAction 함수 //////////////////