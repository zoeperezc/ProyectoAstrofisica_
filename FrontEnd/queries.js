const getUser = () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM ', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  };
  
 
  module.exports = {
    getUser,

  };
  