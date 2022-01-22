// 제이쿼리 기본 js - main.js

/////////////// 제이쿼리 로드구역 ////////////
$(function () { //////// JQB //////////

    // 타이틀 오버시 글자색, 배경색 변경
    // 대상 : .tit
    let tit = $(".tit");
    // mouseover(함수) - 오버시 함수연결
    tit.mouseover(function () {
        // 변경대상: .tit -> 나 자긴 this키워드
        $(this).css({
            color: "red",
            background: "yellow"
        }); /// css ///
    }); ///// mouseover /////

    // 마우스 아웃시 원상복귀
    tit.mouseout(function () {
        // 변경대상: .tit -> 나 자긴 this키워드
        $(this).css({
            color: "yellow",
            background: "pink"
        }); /// css ///
    }); ///// mouseout /////




    ////////////////////////////////////////////////
    // 1. 대상선정 변수할당
    ////////////////////////////////////////////////
    // let aaa = $("#my"); 
    // aaa.click(function(){})
    // aaa.click(function(){})
    // aaa.click(function(){})
    // aaa.click(function(){})

    // 대상1 : 버튼 - .btns button
    let btns = $(".btns button");

    // 대상2 : 미니언즈 - .mi
    let mi = $(".mi");

    // 대상3 : 빌딩 - .building li
    let bd = $(".building li");

    // 대상4 : 메시지 - .msg
    let msg = $(".msg");

    // 좀비 태그 셋업
    let mz1 = '<img src="images/mz1.png" alt="좀비1" class="mz">';
    let mz2 = '<img src="images/mz2.png" alt="좀비2" class="mz">';
    let zom = '<img src="images/zom.png" alt="좀비들" class="mz">';

    // 주사기 태그 셋업
    let inj = '<img src="images/inj.png" alt="주사기" class="inj">';

    // 미니언즈 가로크기 보정값
    // 윈도우 가로크기의 5%
    let win5 = $(window).width() * 0.05;
    // console.log("가로크기5%"+win5);
    // width() 선택요소의 가로크기 구하기
    // height() 선택요소의 세로크기 구하기
    // -> 단위없는 픽셀px값

    //////////////////////////////////////////////////
    // 2. 초기화 셋팅
    //////////////////////////////////////////////////
    // 2-1. 모든 버튼 숨기고 첫번째만 보이게하기
    btns.hide().first().show();
    // 버튼들을 .숨겨() .첫번째()는 .보여()
    // 주어는 하나! 뒤에 메서드 체인!

    // 2-2. 모든 .building li를 순서대로 돌면서 순번넣기 + 좀비넣기
    // each(function(idx,ele){구현부})
    // -> 선택요소를 순서대로 돌면서 구현부를 실행하는 메서드
    // -> idx 전달변수는 순번이 전달됨(0부터)
    // (idx -> index에서 나온말로 변수명 사용)
    // -> ele 전달변수는 요소자신(this키워드와 동일)
    // (ele -> element에서 나온말로 변수명 사용)
    // - 참고로 idx, ele변수면은 변경가능. 변수의 순서중요!
    // - 이 메서드를 사용하면 for문을 안써도 됨!

    bd.each(function (idx, ele) {
        // console.log(idx);
        // 1. 각 li요소에 글자넣기(순번)
        $(ele).text(idx);

        // 2. 좀비 넣기
        if (idx === 9)
            $(ele).append(mz1);
        else if (idx === 7)
            $(ele).append(mz2);
        else if (idx === 1)
            $(ele).append(zom);
        // else if(idx===7)
        //     $(ele).append('<img src="images/mz2.png" alt="좀비2" class="mz">');
        else if (idx === 2)
            $(ele).append(inj);

    }); /////////////// each ////////////////

    // 2-3. 모든 좀비 숨기기
    $(".mz").hide(); //for문이 돌아감
    // 선택요소가 여러개이면 for문을 돌듯이 모두 셋팅됨!

    ////////////////////////////////////////////////////    
    // 3. 버튼별 순서대로 클릭 이벤트함수 만들기!
    ////////////////////////////////////////////////////

    //___________________________________________________________________________________
    // 3-1. '들어가기'버튼
    btns.first().click(function () {
        console.log("들어가기 버튼!");

        //1. 자기자신 버튼 없애기
        $(this).slideUp(400);

        //2. 메시지 지우기
        msg.fadeOut(200);
        // hide는 바로사라지기 fadeOut(시간)는 서서히사라짐

        //3. 이동할 빌딩 li에 위치정보 알아내기!~
        // offset() 메서드 위치나 크기정보를 알려중
        // offset().top값 - top값
        // offset().left값 - left값

        // 이동할 li 타겟 -> bd변수에 할당(.building li)
        let tg = bd.eq(8); // 8번방
        let tval = tg.offset().top; // 화면에서의 top값 
        let lval = tg.offset().left + win5; // 화면에서의 left값 
        // win5는 미니언즈를 left값 보정함!(화면의 5%)
        console.log(tval + "/" + lval);


        //4. 미니언즈 이동하기
        // 대상 : .mi -> mi변수에 할당!
        // animate({CSS설정},시간,이징,함수)
        mi.animate({
            top: tval + "px",
            left: lval + "px"
        }, 1000, function () { ////// 콜백함수 (애니후 실행!) /////

            // 5. 메시지변경
            // 메시지 선택/요소
            msg
                // 메시지 넣기
                .text("와~! 아늑쓰~! 옆방 ㄱㄱ!!")
                //나타나기
                .fadeIn(200);
            // 한번 선택하고 이어서 메서드를 계속 쓰는 방법을 메서드체인이라고 함!
            //나는 ~했다/나는 ~했다 아니고 나는 ~했고,~했다!
            //(중간에 이을때 세미콜론금지)

            //6. 다음 변경 버튼 보이기
            btns.eq(1).slideDown(400);

        }); ///////// animate ///////////

    }); /////////// 3-1. 들어가기버튼 click /////////////

    //___________________________________________________________________________________
    // 3-2. '옆방으로!' 버튼 //////////////////
    btns.eq(1).click(function () {
        console.log("옆방으로! 버튼!");

        // 1. 자기자신 버튼 없애기
        $(this).slideUp(400);

        // 2. 메시지 지우기
        msg.fadeOut(200);
        // fadeOut(시간) - opacity로 서서히 사라짐

        // 3. 이동할 빌딩 li의 위치정보 알아내기!

        // offset() 메서드 위치나 크기정보를 알려줌
        // offset().top - top값
        // offset().left - left값

        // 이동할 li 타겟 -> bd변수에 할당(.building li)
        let tg = bd.eq(9); // 9번방
        let tval = tg.offset().top; // 화면에서의 top값
        let lval = tg.offset().left + win5; // 화면에서의 left값
        // win5는 미니언즈를 left값 보정함!(화면의 5%)
        console.log(tval + "/" + lval);

        // 4. 미니언즈 이동하기
        // 대상: .mi -> mi변수에 할당!
        // animate({CSS설정},시간,이징,함수)
        mi.animate({
            top: tval + "px",
            left: lval + "px"
        }, 1000, function () { // 콜백함수 (애니후 실행!) //

            // setTimeout(함수,시간)
            // -> JS내장 타이밍 함수 : 일정시간뒤 함수 한번실행(자주씀)
            // setTimeout(()=>{}.1/1000초)

            // 5. 좀비 나타나기! (콜백에서 2초후)
            setTimeout(() => { //2초 뒤에 아래를 실행함
                // 현재li(tg변수)에 있는 좀비만 보여라!
                tg.find(".mz").fadeIn(300);
                //  find(요소) 하위 중 자손요소 찾기!
                // 6. 메시지변경
                msg.html("악!;;;; 좀비!<br>어서피하자!") //태그먹히게할려면 html
                    .css({
                        left: "-100%"
                    })
                    .delay(500).fadeIn(200);
                // delay(시간) - 애니메이션 앞에서 지연시간주기

                // 7. 다음변경 버튼 보이기
                btns.eq(2).delay(700).slideDown(400);
                // 0.5초 기다리고 0.2초 나타난 메시지 기다린 후(0.7초) 실행

            }, 2000); /// 타임아웃함수 ////

        }); ////////// animate //////////

    }); /// 3-2. '옆방으로!' 버튼 click ////////
    //___________________________________________________________________________________
    // 3-3. '윗층으로 도망가!' 버튼 //////////////////
    btns.eq(2).click(function () {
        console.log("윗층으로 도망가! 버튼!");

        // 1. 자기자신 버튼 없애기
        $(this).slideUp(400);

        // 2. 메시지 지우기
        msg.fadeOut(200);
        // fadeOut(시간) - opacity로 서서히 사라짐

        // 3. 이동할 빌딩 li의 위치정보 알아내기!

        // offset() 메서드 위치나 크기정보를 알려줌
        // offset().top - top값
        // offset().left - left값

        // 이동할 li 타겟 -> bd변수에 할당(.building li)
        let tg = bd.eq(7); // 7번방
        let tval = tg.offset().top; // 화면에서의 top값
        let lval = tg.offset().left + win5; // 화면에서의 left값
        // win5는 미니언즈를 left값 보정함!(화면의 5%)
        console.log(tval + "/" + lval);

        // 4. 미니언즈 이동하기
        // 대상: .mi -> mi변수에 할당!
        // animate({CSS설정},시간,이징,함수)
        mi.animate({
            top: tval + "px",
            left: lval + "px"
        }, 1000, function () { // 콜백함수 (애니후 실행!) //

            // 5. 메시지변경
            msg.text("..여긴 괜찮겠지..?")
                .delay(500).fadeIn(200);
            // delay(시간) - 애니메이션 앞에서 지연시간주기

            // 6. 좀비 나타나기! (콜백에서 2초후)
            setTimeout(() => { //2초 뒤에 아래를 실행함
                // 현재li(tg변수)에 있는 좀비만 보여라!
                tg.find(".mz").show(300);
                //  find(요소) 하위 중 자손요소 찾기!

                // 5. 메시지변경
                msg.text("꺅! 여기도 ㅠ")
                // delay(시간) - 애니메이션 앞에서 지연시간주기


                // 7. 다음변경 버튼 보이기
                btns.eq(3).delay(700).slideDown(400);

            }, 2000); /// 타임아웃함수 ////

        }); ////////// animate //////////

    }); /// 3-3. '윗층으로 도망가!' 버튼 click ////////
    //___________________________________________________________________________________
    // 3-4. '다시 옆방으로!!' 버튼 //////////////////
    btns.eq(3).click(function () {
        console.log("다시 옆방으로! 버튼!");

        // 1. 자기자신 버튼 없애기
        $(this).slideUp(400);

        // 2. 메시지 지우기
        msg.fadeOut(200);

        // 3. 이동할 빌딩 li의 위치정보 알아내기!

        // 이동할 li 타겟 -> bd변수에 할당(.building li)
        let tg = bd.eq(6); // 6번방
        let tval = tg.offset().top; // 화면에서의 top값
        let lval = tg.offset().left + win5; // 화면에서의 left값
        // win5는 미니언즈를 left값 보정함!(화면의 5%)
        console.log(tval + "/" + lval);

        // 4. 미니언즈 이동하기
        // 대상: .mi -> mi변수에 할당!
        // animate({CSS설정},시간,이징,함수)
        mi.animate({
            top: tval + "px",
            left: lval + "px"
        }, 1000, function () { // 콜백함수 (애니후 실행!) //

            // 5. 메시지변경
            msg.text("..여긴 없겠지..?")
                .css({
                    left: "100%"
                })
                .delay(500).fadeIn(200);

            // 6. 다음메시지 : 2초후 변경 위에 메시지랑 상관 X
            setTimeout(() => {
                msg.html("그래도 무서<br>워 ㅜㅜ윗층으로 고고!");

                // 7. 다음버튼 보이기
                btns.eq(4).fadeIn(200);


            }, 2000); ///////// 타임아웃 ////////////
        }); ////////// animate //////////
    }); /// 3-4. '다시 옆방으로!' 버튼 click ////////
    //___________________________________________________________________________________
    // 3-5. '무서우니 윗층으로!' 버튼 //////////////////
    btns.eq(4).click(function () {
        console.log("무서우니 윗층으로! 버튼!");

        // 1. 자기자신 버튼 없애기
        $(this).slideUp(400);

        // 2. 메시지 지우기
        msg.fadeOut(200);

        // 3. 이동할 빌딩 li의 위치정보 알아내기!

        // 이동할 li 타겟 -> bd변수에 할당(.building li)
        let tg = bd.eq(4); // 4번방
        let tval = tg.offset().top; // 화면에서의 top값
        let lval = tg.offset().left + win5; // 화면에서의 left값
        // win5는 미니언즈를 left값 보정함!(화면의 5%)
        console.log(tval + "/" + lval);

        // 4. 미니언즈 이동하기
        // 대상: .mi -> mi변수에 할당!
        // animate({CSS설정},시간,이징,함수)
        mi.animate({
            top: tval + "px",
            left: lval + "px"
        }, 1000, function () { // 콜백함수 (애니후 실행!) //

            // 5. 메시지변경 : 1초후
            setTimeout(() => {
                msg.empty() // empty() 선택요소 텍스트 데이터 지우기
                    .fadeIn(200, () => {
                        msg.text("무.");
                    })
                    .delay(1500).fadeIn(200, () => {
                        msg.text("무.서.");
                    })
                    .delay(1500).fadeIn(200, () => {
                        msg.text("무.서.워...");
                    });
                // msg요소 뒤에 delay와 fadeIn 애니메이션을 
                // 이어서하면 순서대로 msg에 내이메이션이 쌓여서 하나씩 실행된다!
                // (이것을 애니메이션 큐에 쌓인다고함!)
                // 큐(Queue)는 브라우저 프로그램 실행 메모리 저장소
            }, 1000); ///////////말풍선 타임아웃 /////////////

            // 6. 아랫층좀비 올라와서 달려들기
            setTimeout(() => {
                // 좀비는 ? (7번방좀비)
                bd.eq(7).find(".mz")
                    // 윗층으로 올라오기 -> 타겟의 높이만큼(li하나높이)
                    .animate({
                        top: -tg.height() + "px"
                    }, 500)
                    // 주인공에게 달려들기 -> 타겟의 가로값의 1,5배
                    .animate({
                        right: tg.width() * 1.3 + "px"
                    }, 3000, "easeOutBounce", function () {
                        // 애니후 주인공 이미지 변경하기!
                        mi.find("img").attr("src", "images/mz1.png")
                        // 어튜리뷰트 통합 - attr
                        // arrr(속성명,값) - 선택요소의 속성바꾸기
                        // attr(속성명) - 선택요소의 속성값 가져오기

                        // 메시지 변경하기
                        msg.html("쿠웩~!!~?<br>얼른 치료주사를!!")

                        // 다음보튼 보이기
                        btns.eq(5).fadeIn(200);
                    });
                // 가속도 easing 주기(이징명이 정확해야한다! 복붙추천!)
                // jQuery UI를 라이브러리 아래 추가함!
                // jQuery UI는 제이쿼리 원본개발자들이 
                // 추가 개발하여 배포한 플러그인이다!
                // 드래그,드롭,달력,아코디언,이징,컬러애니 등
                // : 다운로드 사이트에서!
                // https://jqueryui.com/easing/ -> 이징기능
                // 이징 미리보기:
                // https://easings.net/ko

            }, 4000); ///////// 좀비타임아웃 ///////////

        }); ////////// animate //////////
    }); /// 3-5. '무서우니 윗층으로!' 버튼 click ////////
    //___________________________________________________________________________________
    // 3-6. '치료주사방으로!' 버튼 //////////////////
    btns.eq(5).click(function () {
        console.log("치료주사방으로! 버튼!");

        // 1. 자기자신 버튼 없애기
        $(this).slideUp(400);

        // 2. 메시지 지우기
        msg.fadeOut(200);

        // 3. 이동할 빌딩 li의 위치정보 알아내기!

        // 이동할 li 타겟 -> bd변수에 할당(.building li)
        let tg = bd.eq(2); // 2번방
        let tval = tg.offset().top; // 화면에서의 top값
        let lval = tg.offset().left + win5; // 화면에서의 left값
        // win5는 미니언즈를 left값 보정함!(화면의 5%)
        console.log(tval + "/" + lval);

        // 4. 미니언즈 이동하기
        // 대상: .mi -> mi변수에 할당!
        // animate({CSS설정},시간,이징,함수)
        mi.animate({
            top: tval + "px",
            left: lval + "px"
        }, 1000, function () { // 콜백함수 (애니후 실행!) //

            // 1. 주사기 회전!(주사기는 하나뿐!)
            $(".inj").css({
                transform: "rotate(-150deg)",
                Transition: ".5s ease-out 1s", //속시이지 (지연시간 1초)
                zIndex: "9999" //주인공보다 위!
            }); //////////css////////////

            // 주사맞은 후(1.5초후) 다시 미니언즈2(후유증)
            setTimeout(() => {
                // 미니언즈 이미지 변경
                mi.find("img").attr("src", "images/m2.png");

                // 메시지넣기
                msg.text("치료완료!").fadeIn(200)
                    .delay(1000).fadeIn(200,
                        () => {
                            msg.html("이제, 조금만 더<br>가면 탈출이닷!");
                        }); //// fadeIn /////////////

                // 주사기 없애기
                $(".inj").remove();
                // remove()는 선택요소 삭제하기

                // 다음버튼 보이기
                btns.eq(6).fadeIn(200);


            }, 1500); ///// 타임아웃 /////

        }); ////////// animate //////////
    }); /// 3-6. '치료주사방으로!' 버튼 click ////////
    //___________________________________________________________________________________
    // 3-7. '3번방으로!' 버튼 //////////////////
    btns.eq(6).click(function () {
        console.log("3번방으로! 버튼!");

        // 1. 자기자신 버튼 없애기
        $(this).slideUp(400);

        // 2. 메시지 지우기
        msg.fadeOut(200);
        // fadeOut(시간) - opacity로 서서히 사라짐

        // 3. 이동할 빌딩 li의 위치정보 알아내기!

        // offset() 메서드 위치나 크기정보를 알려줌
        // offset().top - top값
        // offset().left - left값

        // 이동할 li 타겟 -> bd변수에 할당(.building li)
        let tg = bd.eq(3); // 3번방
        let tval = tg.offset().top; // 화면에서의 top값
        let lval = tg.offset().left + win5; // 화면에서의 left값
        // win5는 미니언즈를 left값 보정함!(화면의 5%)
        console.log(tval + "/" + lval);

        // 4. 미니언즈 이동하기
        // 대상: .mi -> mi변수에 할당!
        // animate({CSS설정},시간,이징,함수)
        mi.animate({
            top: tval + "px",
            left: lval + "px"
        }, 1000, function () { // 콜백함수 (애니후 실행!) //

            // 메시지 보이기
            msg.text("어서 윗층으로 가자!").fadeIn(200);

            // 다음버튼 보이기
            btns.eq(7).fadeIn(200);

        }); ////////// animate //////////
    }); /// 3-7. '3번방으로!' 버튼 click ////////
    //___________________________________________________________________________________
    // 3-8. '1번방으로!' 버튼 //////////////////
    btns.eq(7).click(function(){
        console.log("1번방으로! 버튼!");

        // 1. 자기자신 버튼 없애기
        $(this).slideUp(400);

        // 2. 메시지 지우기
        msg.fadeOut(200);
        // fadeOut(시간) - opacity로 서서히 사라짐

        // 3. 이동할 빌딩 li의 위치정보 알아내기!

        // offset() 메서드 위치나 크기정보를 알려줌
        // offset().top - top값
        // offset().left - left값

        // 이동할 li 타겟 -> bd변수에 할당(.building li)
        let tg = bd.eq(1); // 1번방
        let tval = tg.offset().top; // 화면에서의 top값
        let lval = tg.offset().left + win5; // 화면에서의 left값
        // win5는 미니언즈를 left값 보정함!(화면의 5%)
        console.log(tval+"/"+lval);

        // 4. 미니언즈 이동하기
        // 대상: .mi -> mi변수에 할당!
        // animate({CSS설정},시간,이징,함수)
        mi.animate({
            top: tval + "px",
            left: lval + "px"
        },1000,function(){ // 콜백함수 (애니후 실행!) //

            // 메시지 보이기
            msg.text("이제 곧 탈출이닷!").fadeIn(200);

            // 다음버튼 보이기
            btns.last().fadeIn(200);

        }); ////////// animate //////////

    }); /// 3-8. '1번방으로!' 버튼 click ////////
    //___________________________________________________________________________________
    // 3-9. '헬기를 호출!' 버튼 //////////////////
    btns.last().click(function(){
        console.log("헬기를 호출! 버튼!");

        // 1. 자기자신 버튼 없애기
        $(this).slideUp(400);

        // 2. 메시지 지우기
        msg.fadeOut(200);
        // fadeOut(시간) - opacity로 서서히 사라짐

        // 3. 이동할 빌딩 li의 위치정보 알아내기!

        // offset() 메서드 위치나 크기정보를 알려줌
        // offset().top - top값
        // offset().left - left값

        // 이동할 li 타겟 -> bd변수에 할당(.building li)
        let tg = bd.eq(0); // 0번방
        let tval = tg.offset().top; // 화면에서의 top값
        let lval = tg.offset().left + win5; // 화면에서의 left값
        // win5는 미니언즈를 left값 보정함!(화면의 5%)
        console.log(tval+"/"+lval);

        // 4. 미니언즈 이동하기
        // 대상: .mi -> mi변수에 할당!
        // animate({CSS설정},시간,이징,함수)
        mi.animate({
            top: tval + "px",
            left: lval + "px"
        },1000,function(){ // 콜백함수 (애니후 실행!) //

            // 메시지 보이기
            msg.text("도와줘요~!!!").fadeIn(200);

            // 좀비들 최종추적!!!
            // 좀비는? bd.eq(1) 1번방에 있는 좀비들
            bd.eq(1).find(".mz")
            .fadeIn(200,function(){ // 콜백함수 (애니후 실행)

                // 좀비들 움직이기
                // this키워드 === bd.eq(1).find(".mz")
                $(this).animate({
                    right: tg.width()*1.3 + "px"
                    // li하나의 width크기의 1.3배만큼 right에서 이동
                }, 5000); ///// animate ////

                // 헬기 등장
                $(".heli").animate({
                    left: "20%"
                }, 2000, function(){ // 콜백함수(애니후)

                    // 주인공이 헬기에 탄 이미지로 변경!
                    $(this).attr("src","images/heli2.png");

                    // 주인공 지우기(헬기에 탔으니까!)
                    mi.hide();//display:none처리!
                    
                })
                .delay(1000) // 1초지연
                .animate({
                    // 조금 이동하기
                    left: "70%"
                },2000,function(){ // 콜백함수 (애니후)
                    // 헬기조정사 좀비로 바뀐 이미지 변경!
                    $(this).attr("src","images/heli3.png");
                }) //// animate ////
                .animate({ // 마지막 화면밖으로 10초간 천천히 나감
                    left: "100%"
                }, 10000, function(){
                    // 미리지정한 class를 타이틀에 줘서 간판떨어짐
                    // 대상 : .tit -> tit변수
                    tit.addClass("on");
                    //  addClass(클래스명) - 선택요소에 class넣기

                    // 3초후에 class "on2"넣기
                    setTimeout(() => {
                        tit.addClass("on2");
                    }, 3000);
                    
                }); //// animate /////

            }); ///////// fadeIn //////////////


        }); ////////// animate //////////

    }); /// 3-9. '헬기를 호출!' 버튼 click ////////
    //___________________________________________________________________________________

}); ///////////JQB 제이쿼리블럭///////////////
////////////////////////////////////////////