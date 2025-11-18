/**
 * Example Lambda handler with custom timeout and error handling
 */

const { fetch } = require('lambda-fetch');

exports.handler = async (event) => {
  try {
    // Make a request with a custom timeout of 5 seconds
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      timeout: 5000, // 5 seconds
      headers: {
        'User-Agent': 'AWS Lambda Function',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const post = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Successfully fetched post',
        post: post,
      }),
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    
    // Check if it's a timeout error
    if (error.message.includes('timeout')) {
      return {
        statusCode: 504,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: 'Gateway Timeout',
          message: 'The request took too long to complete',
        }),
      };
    }
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: error.message,
      }),
    };
  }
};
