const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://pharmacesmart_db_user:vyx2UP46C40ga8jf@cluster0.ualsl3b.mongodb.net/pharmasmart?appName=Cluster0";

async function run() {
  const client = new MongoClient(uri);
  try {
    console.log("Connecting...");
    await client.connect();
    console.log("✅ Successfully connected to MongoDB Atlas!");
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Ping successful!");
  } catch (err) {
    console.error("❌ Direct connection error:", err);
  } finally {
    await client.close();
  }
}
run();
