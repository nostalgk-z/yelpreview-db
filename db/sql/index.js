const { QueryFile } = require('pg-promise');
const path = require('path');


export const users = {
    create: sql('user/create.sql'),
};
export const business = {
    create: sql('business/create.sql'),
    add: sql('business/add.sql'),
};
export const friend = {
    create: sql('friend/create.sql')
};
export const category = {
    create: sql('category/create.sql')
};
export const hascategory = {
    create: sql('hascategory/create.sql')
};
export const checkin = {
    create: sql('checkin/create.sql')
};
export const tip = {
    create: sql('tip/create.sql')
};
export const hours = {
    create: sql('hours/create.sql')
};


///////////////////////////////////////////////////
/// Helper for linking to external query files; ///
function sql(file) {

    const fullPath = path.join(__dirname, file); // generating full path;

    const options = {

        // minifying the SQL is always advised;
        // see also option 'compress' in the API;
        minify: true

        // See also property 'params' for two-step template formatting
    };

    const qf = new QueryFile(fullPath, options);

    if (qf.error) {
        // Something is wrong with our query file :(
        // Testing all files through queries can be cumbersome,
        // so we also report it here, while loading the module:
        console.error(qf.error);
    }

    return qf;

    // See QueryFile API:
    // http://vitaly-t.github.io/pg-promise/QueryFile.html
}
