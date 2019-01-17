$(document).ready(function(){
  console.log('aa ')
  $("form").on('submit', function(event){
    submit()
    event.preventDefault()
  });

  function submit(){
    console.log('aaaaa')
    host = $('#host-sql').val()
    port = $('#port-sql').val()
    dbname = $('#dbname-sql').val()
    id = $('#root-sql').val()
    password = $('#password-sql').val()

    dict_query = {
      "host": host,
      "port": port,
      "dbname": dbname,
      "id": id,
      "password": password
    }

    console.log(dict_query)

    $.ajax({
      type: "POST",
      data: JSON.stringify(dict_query),
      url: "config/sql/set",
      contentType: "application/json",
      dataType: "json"}).done(function(result){
        if (result.code != 200){
          $('#content-config-sql').attr('class', 'alert alert-danger').attr('role', 'alert').text('연결에 실패!!')
          console.log('fail')
        }
        else{
          console.log('success')
          $(location).attr('href', '/config/file')
        }
      })
  }
})
