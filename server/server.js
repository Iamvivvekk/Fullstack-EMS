import app from './src/app.js'
import connectToDb from './src/config/db.js'

const PORT = process.env.PORT || 3002;

connectToDb()


app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
