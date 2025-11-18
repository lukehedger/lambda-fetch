/**
 * Basic Lambda handler example using lambda-fetch
 */

const { fetch } = require('lambda-fetch');

exports.handler = async (event) => {
  try {
    // Make a GET request to fetch user data
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const users = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Successfully fetched users',
        count: users.length,
        users: users,
      }),
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Failed to fetch data',
        message: error.message,
      }),
    };
  }
};
