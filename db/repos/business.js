const sql = require('../sql').business;
import * as path from 'path';
const cs = {}; // Reusable ColumnSet objects.

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

class BusinessRepository {
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
    async add(values) {
        return this.db.one(sql.add, {
            name: values.name,
            state: values.state,
            city: values.city
        });
    }

    async milestone1db(){
        return this.total().then(total =>
            total === 0
                ? this.db.any("\copy business (id,name,state,city) FROM '/home/autopilot/WebstormProjects/yelpreview-db/milestone1db.csv' DELIMITER ',' CSV", [true])
                : null
        ).then( res => console.log(res))
    }    

    // Tries to delete a product by id, and returns the number of records deleted;
    // async remove(id) {
    //     return this.db.result('DELETE FROM Business WHERE id = $1', +id, r => r.rowCount);
    // }

    // Tries to find a user product from user id + product name;
    async find(values) {
        // return this.db.oneOrNone(sql.find, {
        //     name: +values.name,
        //     productName: values.name
        // });
    }

    async findByName(name) {
        return this.db.oneOrNone('SELECT * FROM business WHERE name = $1', name);
    }

    // Returns all product records;
    async all() {
        return this.db.any('SELECT * FROM business');
    }

    async allStates(){
        return this.db.any('SELECT DISTINCT state FROM business');
    }

    async findCitiesByStates(states) {
        return this.db.any('SELECT DISTINCT city FROM business WHERE state IN ($1:list) ORDER BY city', [states]);
    }

    async findBusinessByPostalCode(code){
        return this.db.any('SELECT * FROM business WHERE postal_code = ${code}', {'code': code});
    }

    async findPostalCodeByCity(city) {
        return this.db.any('SELECT DISTINCT postal_code FROM business WHERE city = ${city}', {'city': city});
    }

    async findByStateAndCity(state, city) {
        return this.db.any('SELECT * from business WHERE state = ${state} AND city = ${city} ORDER BY name', {'state': state, 'city': city});
    }

    async getNumBusinessesInSameState(id) {
        return this.db.one('SELECT count(*) FROM business ' +
            'WHERE state = (SELECT state FROM business WHERE id = $1)',
            id
        )
    }

    async getNumBusinessesInSameCity(id) {
        return this.db.one('SELECT count(*) FROM business ' +
            'WHERE state = (SELECT state FROM business WHERE id = $1) ' +
            'AND city = (SELECT city FROM business WHERE id = $1)',
            id
        );
    }

    // Returns the total number of Business;
    async total() {
        return this.db.one('SELECT count(*) FROM business', [], a => +a.count);
    }

    async getBusinessesByCategoryAndPostalCode(category, postalCode) {
        return this.db.any(
            'SELECT Business.*\n' +
            'FROM Business\n' +
            '    INNER JOIN HasCategory ON (Business.id = HasCategory.business)\n' +
            '    INNER JOIN Category ON (Category.id = HasCategory.category)\n' +
            'WHERE Category.type = ${category}' +
            '    AND Business.postal_code = ${postalCode}',
            {'category': category, 'postalCode': postalCode})
    }

    async getBusinessesCategoryFilter(categories, postalCode) {
        return this.db.any(
            'SELECT Business.*\n' +
            'FROM Business\n' +
            '    INNER JOIN HasCategory ON (Business.id = HasCategory.business)\n' +
            '    INNER JOIN Category ON (Category.id = HasCategory.category)\n' +
            'WHERE Category.type IN ${categories:list}\n' +
            '    AND Business.postal_code = ${postalCode}',
            {'categories': categories, 'postalCode': postalCode}
        )
    }
}

//////////////////////////////////////////////////////////
// Example of statically initializing ColumnSet objects:

function createColumnsets(pgp) {
    // create all ColumnSet objects only once:
    if (!cs.insert) {
        // Type TableName is useful when schema isn't default "public" ,
        // otherwise you can just pass in a string for the table name.
        const table = new pgp.helpers.TableName({table: 'business', schema: 'public'});

        //cs.insert = new pgp.helpers.ColumnSet(['name'], {table});
        //cs.update = cs.insert.extend(['?id', '?user_id']);
    }
    return cs;
}

export default BusinessRepository;