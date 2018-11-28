$(function(){
  var search_list = $('#incre-search');
  var join_list = $('#joinUser');

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
  <p class="chat-group-user__name">${user.name}</p>
  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
</div>`
  search_list.append(html);
  }

  function appendNoUser(text){
    var html=`<div class="chat-group-user clearfix">${text}</div>`
    search_list.append(html);
  }

  function joinUser(user) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id=''>
  <input name='group[user_ids][]' type='hidden' value='${user.id}'>
  <p class='chat-group-user__name'>${user.name}</p>
  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
</div>`
    join_list.append(html);
  }

  $('#user-search-field').on('keyup',function(){
    var input = $(this).val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      $('#incre-search').empty();
      if(users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
      });
      }
      else {
        appendNoUser('一致するユーサーはいません');
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました')
    });

    $(document).on('click','.user-search-add',function(e){
    var clickUserDiv = $(this);
    var clickUser = {id: clickUserDiv.attr('data-user-id'), name: clickUserDiv.attr('data-user-name')};
    clickUserDiv.parent().remove();

    joinUser(clickUser);
    e.stopImmediatePropagation();
  });

    $(document).on('click','.user-search-remove',function(e){
      var clickUserDiv = $(this).parent();
      var clickUser = {id: clickUserDiv.children('input').val(), name: clickUserDiv.children('p').text()};
      clickUserDiv.remove();

      appendUser(clickUser);
      e.stopImmediatePropagation();
    });
  });
});
