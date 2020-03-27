const sql = require('../sql').friend;
import * as path from 'path';
const cs = {}; // Reusable ColumnSet objects.

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

class FriendRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;

        // set-up all ColumnSet objects, if needed:
        createColumnsets(pgp);
    }

    // Creates the table;
    async create() {
        return this.db.none(sql.create);
    }

    // Drops the table;
    // async drop() {
    //     return this.db.none(sql.drop);
    // }

    // Removes all records from the table;
    // async empty() {
    //     return this.db.none(sql.empty);
    // }

    // Adds a new record and returns the full object;
    // It is also an example of mapping HTTP requests into query parameters;
    // async add(values) {
    //     return this.db.one(sql.add, {
    //         name: values.name,
    //         state: values.state,
    //         city: values.city
    //     });
    // }

    // Tries to delete a product by id, and returns the number of records deleted;
    // async remove(id) {
    //     return this.db.result('DELETE FROM Business WHERE id = $1', +id, r => r.rowCount);
    // }

    // async findByName(name) {
    //     return this.db.oneOrNone('SELECT * FROM business WHERE name = $1', name);
    // }

    // Returns all product records;
    async all() {
        return this.db.any('SELECT * FROM friend');
    }

    // Returns the total number of Business;
    async total() {
        return this.db.one('SELECT count(*) FROM friend', [], a => +a.count);
    }
}

//////////////////////////////////////////////////////////
// Example of statically initializing ColumnSet objects:

function createColumnsets(pgp) {
    // create all ColumnSet objects only once:
    if (!cs.insert) {
        // Type TableName is useful when schema isn't default "public" ,
        // otherwise you can just pass in a string for the table name.
        const table = new pgp.helpers.TableName({table: 'friend', schema: 'public'});

        //cs.insert = new pgp.helpers.ColumnSet(['name'], {table});
        //cs.update = cs.insert.extend(['?id', '?user_id']);
    }
    return cs;
}

export default FriendRepository;