// 보그코리아 로그인 페이지 JS - login.js //

$(function(){////////////////////jQB////////////////////////////////

    /// 서브밋 버튼 클릭시 아이디,비번 입력확인하기 //
    // 이벤트대상 : #sbtn
    // 체크대상 : #mid,#mpw

    // 아이디요소
    let mid = $("#mid");
    // 비번요소
    let mpw = $("#mpw");

    $("#sbtn").click(function(e){

        // 기본기능막기 : 서브밋기능막기!
        e.preventDefault();

        // 두값이 모두 빈 값인지 체크함
        // .val() 은 선택요소의 값을 읽거나 쓰는 메서드
        // trim() 은 문자앞뒤의 공백을 제거하는 메서드
        // -> 공백만 넣으면 공백자체를 제거함!
        if(mid.val().trim() === "" || mpw.val().trim() === "" ){ //둘중에하나라도 빈값이면
            alert("아이디와 비밀번호 모두 입력해야 합니다");
            mid.val(""); // 기존값지우기
            mpw.val(""); // 기존값지우기
            mid.focus(); // 아이디 입력창에 포커스 주기
            // focus() 메서드 : 선택요소에 포커스 이동
        }/////////////if////////////
        else{
            // 아이디와 비번을 모두 입력한 경우
            // 원래는 DB에 회원정보를 조회하여 로그인을 해야함
            alert("로그인에 성공하였습니다");//임시
        }///////else////////


    });////////////click////////////

});/////////////////////////jQB///////////////////////////////