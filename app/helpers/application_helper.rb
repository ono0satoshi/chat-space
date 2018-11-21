module ApplicationHelper
  def format_posted_time(time)
    time.to_s(:datetime)
  end
end
