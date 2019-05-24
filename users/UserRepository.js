const {ObjectId} = require('mongodb');

class UserRepository {

  constructor(db) {
    this.db = db
  }

  async create(user) {
    const now = Date.now();
    const promise = new Promise((resolve, reject) => {
      this.db.insertOne({name: user.name, email: user.email, last_access: now}, (error, result) => {
        if (error) reject();
        else resolve(result.ops[0]);
      })
    });
    return await promise;
  }

  async read(id) {
    return await this.db.findOne({'_id': ObjectId(id)});
  }

  async update(user) {
    const now = Date.now();
    return await this.db.updateOne({'_id': ObjectId(user._id)}, {
      $set: {
        name: user.name,
        email: user.email,
        last_access: now
      }
    }, {upsert: true});
  }

  async delete(id) {
    const user = await this.read(id);
    await this.db.deleteOne({'_id': ObjectId(id)});
    return user;
  }

  async list({last_access_max}) {
    return await this.db.find({last_access: {$lte: last_access_max}}).toArray();
  }
}

module.exports = {UserRepository};