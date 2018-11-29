$(document).on('turbolinks:load',function(){
  function buildHTML(message){
    var insertText = ``
    if(message.body){
      var insertText = `<p>
                    ${message.body}
                    </p>`
    }

    var img = ``
    if (message.image){
      var img = `<img class="chat-main_message-body-image" src="${message.image}" alt="" />`
    }

    // var dat = new Date(message.created_at);
    // var created_at = `${dat.getFullYear()}/${dat.getMonth()}/${dat.getDate()} ${dat.getHours()}:${dat.getSeconds()}`

    var html = `<div class='chat-main_body-messages-list' id="target">
                <div class='chat-main_message',data-message-id='${message.id}'>
                <div class='chat-main_message-name'>
                ${message.user_name}
                </div>
                <div class='chat-main_message-time'>
                ${message.created_at}
                </div>
                <div class='chat-main_message-body'>
                ${insertText}
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
      document.getElementById('new_message').reset();
      var newPostPosi = $('#target').offset().top;
      $('html,body').animate({scrollTop:newPostPosi},'fast');
    })
    .fail(function(){
      alert('error');
    });
  });

  var interval = setInterval(function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      $.ajax({
      url: location.href,
      dataType: 'json'
    })
    .done(function(data){
      var id = $('.chat-main_message').data('messageId');
      var insertHTML = ``;

      data.messages.forEach(function(message){
        if(message.id > id){
          insertHTML += buildHTML(message);
        }
      });
      $('.chat-main_body').prepend(insertHTML);
    })
    .fail(function(){
      alert('自動更新に失敗しました');
    });
    }
    else {
      clearInterval(interval);
    }
  },5000);
});
