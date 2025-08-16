import Logo from "./Logo";

const Comment = ({ comments }) => {
  function timeAgo(dateString) {
    const now = new Date();
    const created = new Date(dateString);
    const diffInSeconds = Math.floor((now - created) / 1000);

    const units = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const unit of units) {
      const interval = Math.floor(diffInSeconds / unit.seconds);
      if (interval >= 1) {
        return `${interval} ${unit.label}${interval > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  }
  return (
    <div className="comment-container">
      {comments.map((comment) => (
        <div key={comment?.id} className="comment">
          <Logo
            logoUrl={comment?.user_id?.logoUrl}
            userId={comment?.user_id?._id}
          />
          {/* <img src={comment?.user_id?.logoUrl} alt="" /> */}
          <div className="comment-info">
            <div className="comment-username">
              <h4>{comment?.user_id?.channelName}</h4>
              <p>{timeAgo(comment?.createdAt)}</p>
            </div>
            <p>{comment?.commentText}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comment;
