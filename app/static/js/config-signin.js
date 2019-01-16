$(document).ready(function(){
  $("form").on('submit', function(event){
    submit()
    event.preventDefault()
  });

  function submit(){
    id = $('#id-signin').val()
    password = $('#password-signin').val()
    repassword = $('#repassword-signin').val()
    email = $('#email-signin').val()

    console.log(id, password, repassword, email)
    // 비어 있는 곳 확인
    if (id=='' || password=='' || repassword=='' || email==''){
      console.log('no')
      $('#content-config-signin').empty()
      $('#content-config-signin').attr('class', 'alert alert-danger').attr('role', 'alert').text('빈곳을 채워주세요!!')
    }
    else{
      if (password != repassword){
        console.log('diff')
        $('#content-config-signin').empty()
        $('#content-config-signin').attr('class', 'alert alert-danger').attr('role', 'alert').text('암호가 서로 다릅니다.!!')
      } else{
        $('#content-config-signin').clear()
        dict_query = {
          "id": id,
          "password": password,
          "repassword": repassword,
          "email": email
        }

        console.log(dict_query)
      }
    }
    //
    // $.ajax({
    //   type: "POST",
    //   data: JSON.stringify(dict_query),
    //   url: "/config/file/set",
    //   contentType: "application/json",
    //   dataType: "json"}).done(function(result){
    //     console.log(dict_query)
    //     console.log(result.code)
    //     if (result.code != 200){
    //       $('#content-config-file').attr('class', 'alert alert-danger').attr('role', 'alert').text('파일 디렉토리를 찾을 수 없습니다!!')
    //       console.log('fail')
    //     }
    //     else{
    //       console.log('success')
    //       $(location).attr('href', '/config/signin')
    //     }
    //   })
  }
})
