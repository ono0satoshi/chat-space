class MessagesController < ApplicationController
  before_action :set_group
  before_action :correct_user
  def index
    @message = Message.new
    @messages = @group.messages.order(created_at: :ASC).includes(:user)

    respond_to do |format|
      format.html
      format.json {@new_message = @group.messages.where('id > ?',params[:message][:id])}
    end

  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html {redirect_to group_messages_path(@group), notice: "メッセージを送信しました"}
        format.json
      end
    else
      @message = @group.messages.includes(:user)
      redirect_to group_messages_path, alert: 'メッセージを入力してください'
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

  def correct_user
    @current_group = current_user.groups.find_by(id: params[:group_id])
    unless @current_group
      redirect_to root_url
    end
  end
end
