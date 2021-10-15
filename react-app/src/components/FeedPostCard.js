import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { addCommentThunk, addLikeThunk, removeLikeThunk } from '../store/sessionUserPosts';
import { useDispatch } from 'react-redux';
import { getSessionUsersPostsThunk } from '../store/sessionUserPosts';
import { getFollowedUsersPostsThunk } from '../store/followedUsersPosts'
import EditDeleteCommentModal from './EditDeleteCommentModal';
import DeletePostModal from './DeletePostModal';
import HoverUserCard from './HoverUserCard';
import { useModal } from '../context/Modal';
import './FeedPostCard.css'

function FeedPostCard({post}) {
    const { toggleModal, setModalContent } = useModal();
    const [showComments, setShowComments] = useState(false);
    const [showCommentOptions, setShowCommentOptions] = useState(false);
    const [comment, setComment] = useState('')
    const [showHoverUserCard, setShowHoverUserCard] = useState(false);
    const commentRef = useRef();
    const commentOptionsRef = useRef();
    const likeRef = useRef();
    const dispatch = useDispatch();
    const users = useSelector(state => state.users)
    const sessionUser = useSelector(state => state.session.user)
    const user = users[post?.user_id]

    let likesArr = [];
    let commentsArr = [];
    let lastComment;
    if (post?.likes) likesArr = Object.values(post.likes)
    if (post?.comments) commentsArr = Object.values(post.comments)
    if (commentsArr) lastComment = commentsArr[commentsArr.length -1]

    const isVideo = post.content?.slice(-3) === 'mp4' ||
                    post.content?.slice(-3) === 'mov' ||
                    post.content?.slice(-3) === 'wmv' ||
                    post.content?.slice(-3) === 'avi' ||
                    post.content?.slice(-4) === 'webm' ||
                    post.content?.slice(-5) === 'html5'


    const submitComment = async (e) => {
        e.preventDefault();
        const newComment = {
            'description': comment,
            'post_id': post.id
        }

        commentRef.current.value = '';
        setComment('');
        await dispatch(addCommentThunk(newComment));
        await dispatch(getSessionUsersPostsThunk());
        await dispatch(getFollowedUsersPostsThunk());
    }

    const focusComment = () => {
        commentRef.current.focus();
    }

    const addLike = async () => {
        const newLike = {
            'post_id': post.id,
        }
        await dispatch(addLikeThunk(newLike));
        await dispatch(getSessionUsersPostsThunk());
        await dispatch(getFollowedUsersPostsThunk());
    }

    const removeLike = async () => {
        const likeToDelete = {
            'post_id': post.id
        }
        await dispatch(removeLikeThunk(likeToDelete));
        await dispatch(getSessionUsersPostsThunk());
        await dispatch(getFollowedUsersPostsThunk());
    }

    const openDeletePostModal = () => {
        setModalContent((
            <DeletePostModal postId={post.id} />
        ));
        toggleModal();
    }

    const openCommentOptionsModal = (comment) => {
        setModalContent((
            <EditDeleteCommentModal comment={comment}/>
        ));
        console.log(comment)
        toggleModal();
    }

    const buttonClickAnimationShrink = () => {
        const likeIcon = likeRef.current;
        likeIcon.style.transform = 'scale(0.8)'
    }

    const buttonClickAnimationGrow = () => {
        const likeIcon = likeRef.current;
        likeIcon.style.transform = 'scale(1)'
    }

    let timeOutOn;
    let timeOutOff;

    const openHoverUserCard = () => {
        if (timeOutOff) {
            clearTimeout(timeOutOff)
        }
        timeOutOn = setTimeout(() => {
            setShowHoverUserCard(true)
        }, 500)
    }

    const closeHoverUserCard = async () => {
        if (timeOutOn) {
            clearTimeout(timeOutOn)
        }
        timeOutOff = setTimeout(() => {
            setShowHoverUserCard(false)
        }, 500)
    }

    return (
        <div className="post-container">
            <div className="post-header">
                <div onMouseLeave={closeHoverUserCard} className="post-header-user-info">
                    <img onMouseOver={openHoverUserCard} className="post-profile-picture" src={user?.profile_picture} alt="" />
                    <p onMouseOver={openHoverUserCard} className="post-user">{user?.username}</p>
                    {showHoverUserCard && <HoverUserCard user={users[post.user_id]}/>}
                </div>
                {post.user_id === sessionUser.id && <i onClick={openDeletePostModal} className="fas fa-ellipsis-h options"></i>}
            </div>
            {isVideo ? (
                <video className="post-image" src={post?.content} controls></video>
            ):(
                <img className="post-image" src={post?.content} alt="" />
            )}
            <div className="post-interaction-icons-container">
                {post.likes && sessionUser.id in post.likes ? (
                    <i ref={likeRef} onMouseDown={buttonClickAnimationShrink} onMouseUp={buttonClickAnimationGrow} onClick={removeLike} className="fas fa-heart feed-like-icon-filled"></i>
                ): (
                    <i ref={likeRef} onMouseDown={buttonClickAnimationShrink} onMouseUp={buttonClickAnimationGrow} onClick={addLike} className={`far fa-heart feed-like-icon`}></i>
                )}
                <i onClick={focusComment} className="far fa-comment feed-comment-icon"></i>
            </div>
            <p className="feed-likes-count">{likesArr.length} likes</p>
            <div className="post-page-description-container">
                <span className="post-description-user">{user?.username}</span>
                <span className="post-page-description">{post?.description}</span>
            </div>
            {!showComments && (commentsArr.length > 1) && <div className="view-comments" onClick={() => setShowComments(true)}>View all {commentsArr?.length} comments</div>}
            {commentsArr.length === 0 && <div className="view-comments">No comments</div>}
            <div className="comments-container">
                {showComments === true ? (
                    commentsArr?.map((comment, index) => {
                        const commentUser = users[comment.user_id];
                        const randomKey = (comment.id + index) / comment.id + comment.user_id
                        return (
                            <div 
                                key={randomKey} 
                                onMouseEnter={() => setShowCommentOptions(comment)} 
                                onMouseLeave={() => setShowCommentOptions(false)} 
                                className="comment-row"
                            >
                                <div className="feed-comment"><span className="comment-user">{commentUser?.username}</span> {comment.description}</div>
                                <div className="comment-options-container">
                                    {showCommentOptions === comment && comment.user_id === sessionUser.id && <i onClick={() => openCommentOptionsModal(comment)} ref={commentOptionsRef} className={`fas fa-ellipsis-h comment-options-icon`}></i>}
                                </div>
                            </div>
                        )
                    })
                ): (
                    <div
                        onMouseEnter={() => setShowCommentOptions(lastComment)} 
                        onMouseLeave={() => setShowCommentOptions(false)} 
                        className="comment-row"
                    >
                        <div className="feed-comment"><span className="comment-user">{users[lastComment?.user_id]?.username}</span> {lastComment?.description}</div>
                        <div className="comment-options-container">
                            {showCommentOptions === lastComment && lastComment?.user_id === sessionUser.id && <i onClick={() => openCommentOptionsModal(lastComment)} ref={commentOptionsRef} className={`fas fa-ellipsis-h comment-options-icon`}></i>}
                        </div>
                    </div>
                )}
            </div>
            <form
                className="feed-new-comment-form"
                onSubmit={submitComment}
            >
                <textarea
                    ref = {commentRef}
                    rows="1"
                    placeholder="Add a comment..."
                    className="feed-new-comment-input"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button className={`feed-new-comment-button disabled-${comment.replace(/\s/g, '').length === 0}`} disabled={comment.replace(/\s/g, '').length === 0}>Post</button>
            </form>
        </div>
    )
}

export default FeedPostCard;
