$(document).ready(function(){
  $("form").on('submit', function(event){
    submit()
    event.preventDefault()
  });

  function submit(){
    id = $('#id-signup').val()
    password = $('#password-signup').val()
    repassword = $('#repassword-signup').val()
    email = $('#email-signup').val()

    console.log(id, password, repassword, email)
    // 비어 있는 곳 확인
    if (id=='' || password=='' || repassword=='' || email==''){
      console.log('no')
      $('#content-config-signup').empty()
      $('#content-config-signup').attr('class', 'alert alert-danger').attr('role', 'alert').text('빈곳을 채워주세요!!')
    }
    else{
      if (password != repassword){
        console.log('diff')
        $('#content-config-signup').empty()
        $('#content-config-signup').attr('class', 'alert alert-danger').attr('role', 'alert').text('암호가 서로 다릅니다.!!')
      } else{
        dict_query = {
          "id": id,
          "password": password,
          "repassword": repassword,
          "email": email
        }

        console.log(dict_query)

        $.ajax({
          type: "POST",
          data: JSON.stringify(dict_query),
          url: "/config/signup/create",
          contentType: "application/json",
          dataType: "json"}).done(function(result){
            if (result.code != 200){
              $('#content-config-sql').attr('class', 'alert alert-danger').attr('role', 'alert').text('연결에 실패!!')
              console.log('fail')
            }
            else{
              console.log('success')
              $(location).attr('href', '/config/success')
            }
          })
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
