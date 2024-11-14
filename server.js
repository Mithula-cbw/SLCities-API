const { port } = require('./config/config')
const app = require('./app');
const connectDB = require('./config/db');

connectDB().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });


