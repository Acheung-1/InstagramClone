const PostDetails = ({ post }) => {
    return ( 
        <div className="post-details">
            <h4>{post.image}</h4>
            <p>{post.caption}</p>
            <p><strong>Likes: </strong> {post.likes}</p>
            <p>{post.createdAt}</p>
        </div>
     );
}
 
export default PostDetails;