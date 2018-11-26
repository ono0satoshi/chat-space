require 'rails_helper'
# メッセージ一覧ページを表示するアクション
# ログインしている場合
# アクション内で定義しているインスタンス変数があるか
# 該当するビューが描画されているか
# ログインしていない場合
# 意図したビューにリダイレクトできているか
describe MessagesController, type: :controller do
  let(:user){ create(:user)}
  let(:group){ create(:group)}

  describe 'GET #index' do
    context 'log_in' do
      before do
        login_user user
        get :index, params: {group_id: group.id}
      end

      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      it 'renders index' do
        expect(response).to render_template :index
      end
    end

    context 'not log_in' do
      before do
        get :index, params: {group_id: group.id}
      end

      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe 'create message' do
    let(:params){ {group_id: group.id, user_id: user.id, message: attributes_for(:message)}}
    context 'login' do
      before do
        login_user user
      end

      context 'can save' do
        subject {
        post :create,
        params: params
      }

        it 'can save message' do
          expect{subject}.to change(Message, :count).by(1)
        end

        it 'render index' do
          #意図したページに遷移しているか
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do
        let(:invalid_params){{group_id: group.id, user_id: user.id, message: attributes_for(:message, body: nil, image: nil)}}

        subject {
          post :create,
          params: invalid_params
        }
        it 'can not save message' do
          expect{subject}.not_to change(Message, :count)
        end

        it 'render index?' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'not login' do
      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
