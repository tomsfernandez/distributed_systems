const {ObjectId} = require('mongodb');

export class RecommendationRepository {

    constructor(db) {
        this.db = db
    }

    async create(userId) {
        const now = Date.now();
        const promise = new Promise((resolve, reject) => {
            this.db.insertOne({user_id: userId, last_recommendation: now}, (error, result) => {
                if (error) reject();
                else resolve(result.ops[0]);
            })
        });
        return await promise;
    }

    async update(recommendation) {
        const now = Date.now();
        return await this.db.updateOne({'_id': ObjectId(recommendation._id)}, {
            $set: {
                user_id: recommendation.user_id,
                last_recommendation: now
            }
        }, {upsert: true});
    }

    async read(userId) {
        return await this.db.findOne({'user_id': userId});
    }
}