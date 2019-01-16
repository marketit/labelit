$(document).ready(function(){
  $("form").on('submit', function(event){
    submit()
    event.preventDefault()
  });

  function submit(){
    path_file = $('#file-directory').val()

    dict_query = {
      "path": path_file,
    }

    console.log(dict_query)

    $.ajax({
      type: "POST",
      data: JSON.stringify(dict_query),
      url: "/config/file/set",
      contentType: "application/json",
      dataType: "json"}).done(function(result){
        console.log(dict_query)
        console.log(result.code)
        if (result.code != 200){
          $('#content-config-file').attr('class', 'alert alert-danger').attr('role', 'alert').text('파일 디렉토리를 찾을 수 없습니다!!')
          console.log('fail')
        }
        else{
          console.log('success')
          $(location).attr('href', '/config/signin')
        }
      })
  }
})
