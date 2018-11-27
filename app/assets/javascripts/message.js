$(function(){
  function buildHTML(message){
    if(message.body){
      var pValue = `<p>
                    ${message.body}
                    </p>`
    }
    else{
      var pValue = ``
    }
    if (message.image){
      var img = `<img class="chat-main_message-body-image" src="${message.image}" alt="" />`
    }
    else{
      var img = ``
    }

    var dat = new Date(message.created_at);
    var created_at = `${dat.getFullYear()}/${dat.getMonth()}/${dat.getDate()} ${dat.getHours()}:${dat.getSeconds()}`

    var html = `<div class='chat-main_body-messages-list' id="target">
                <div class='chat-main_message'>
                <div class='chat-main_message-name'>
                ${message.user_name}
                </div>
                <div class='chat-main_message-time'>
                ${created_at}
                </div>
                <div class='chat-main_message-body'>
                ${pValue}
                ${img}
                </div>
                </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");

    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData:false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main_body').append(html);
      $('.message').val('');
      $('')
      var newPostPosi = $('#target').offset().top;
      $('html,body').animate({scrollTop:newPostPosi},'fast');
    })
    .fail(function(){
      alert('error');
    });

  });
});
