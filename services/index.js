	
exports.handler = async (event) => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Congratulations ! Your function executed successfully!',
        input: event,
      }),
    };
  };


