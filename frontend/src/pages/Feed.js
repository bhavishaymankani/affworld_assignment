import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Feed.css';
import { fetchFeed, uploadPost } from '../api/apiService'; // Importing API functions

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      const response = await fetchFeed();
      console.log(JSON.stringify(response))
      setPosts(response.reverse());
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle drag & drop upload
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !caption) {
      alert('Please provide an image and caption');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);

    try {
      const response = await uploadPost(formData);
      setPosts([response.data, ...posts]);
      setCaption('');
      setImage(null);
      setImagePreview(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error uploading post:', error);
      alert('Failed to upload post');
    } finally {
      setLoading(false);
      fetchPosts()
    }
  };

  return (
    <div className="container feed-container mt-4">
      <h2 className="text-center mb-4">User Feed</h2>
      <button className="btn btn-primary add-post-btn" onClick={() => setShowForm(!showForm)}>
        <FaPlus /> Add Post
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="my-4">
          <div
            className="drop-area mb-3"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('fileInput').click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="preview-img" />
            ) : (
              <p className="drop-text">Drag & Drop an image here or click to select</p>
            )}
          </div>
          <input
            id="fileInput"
            type="file"
            className="d-none"
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? 'Uploading...' : 'Post'}
          </button>
        </form>
      )}

<div className="feed-list mt-4">
  {posts.length > 0 ? (
    posts.map((post, index) => (
      post && post.imageUrl ? (
        <div key={post.userId || index} className="feed-item border p-3 mb-4 rounded shadow-sm">
          <div className="feed-content mt-2">
            <h5 className="mb-1 text-primary">{post.userId.name}</h5>
          </div>  
          <img src={post.imageUrl} alt="Post" className="feed-img w-100 rounded" style={{ maxHeight: '400px', objectFit: 'contain' }} />
          <div className="feed-content mt-2">
            <p className="mb-0 text-muted">{post.caption || 'No caption available'}</p>
          </div>
        </div>
      ) : (
        <p key={index} className="text-danger">Invalid post data</p>
      )
    ))
  ) : (
    <p className="text-center text-muted">No posts available</p>
  )}
</div>




    </div>
  );
};

export default Feed;
