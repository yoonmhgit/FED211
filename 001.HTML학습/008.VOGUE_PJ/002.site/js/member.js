// 보그코리아 회원가입 페이지 JS - member.js //

$(function(){///////////////////jQB/////////////////////////

    /* 
        [ 입력폼의 유효성 검사 ]
        - 검사원리 : 입력창에 클릭 또는 탭하여 입력가능상태(커서깜빡)를 포커스상태라고함
                    이벤트로는 focus 이벤트임!
                    이 포커스 상태에서 다른 부분을 클릭(탭)되면 포커스가 풀리게 된다.
                    이 상태를 블러(blur)상태 라고함!
                    이렇게 이벤트가 블러로 발생할때 유효성검사를 시행함!
        - 이벤트 대상선정 : 입력요소중 input type이 text, password
        input[type=text],input[type=password]
        (유의사항 : type=text 인 요소 중에서 아이디가 email2 인 요소는 검사에서 제외함!)
        제외하기 위한 선택자 : input[type=text][id!=email2]
        -> != 선택연산자는 제이쿼리 전용이다!

        - 제이쿼리사용 전용 메서드 : blur() 메서드

    */
   $("input[type=text][id!=email2],input[type=password]")
   .blur(function(){
    console.log("불러써?");

    // 1. 블러가 발생한 아이디 알아오기
    let cid = $(this).attr("id");

    console.log("아이디:"+cid);

   });/////////////blur/////////////


});///////////////////jQB/////////////////////////