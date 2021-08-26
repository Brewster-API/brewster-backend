import client from '../lib/client.js';
run();

async function run() {
  try {
    await client.query(`
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS drinks CASCADE;
      DROP TABLE IF EXISTS favorites CASCADE
    `);
    console.log('drop tables complete');
  } catch (err) {
    console.log(err);
  } finally {
    client.end();
  }
}
