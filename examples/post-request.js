/**
 * Example Lambda handler that makes a POST request
 */

const { fetch } = require('lambda-fetch');

exports.handler = async (event) => {
  try {
    // Parse the incoming request body
    const body = JSON.parse(event.body || '{}');
    
    // Make a POST request to create a new resource
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: body.title,
        body: body.content,
        userId: body.userId || 1,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const newPost = await response.json();
    
    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Successfully created post',
        post: newPost,
      }),
    };
  } catch (error) {
    console.error('Error creating post:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Failed to create post',
        message: error.message,
      }),
    };
  }
};
