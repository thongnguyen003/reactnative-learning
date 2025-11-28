import {getDb} from "./database";

interface UpdateValue {
  field: string;
  newValue: any;
}

export const updateData = async(id: number, tableName: string, newValues: UpdateValue[]): Promise<void> => {
    try{ 
        const db = await getDb();
        const setClause = newValues.reduce((prev, value, index)=>{
            return prev + value.field.toString() + '=?' + (index< (newValues.length-1) ? ',': '')
        },'')
        const params = newValues.map(v => v.newValue);
        params.push(id)

        const query = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`;

        await db.executeSql(query, params)
        console.log('✅ Data updated');
    }
    catch(err){
        console.error('❌ Error updating data:', err);
    }
};

export const deleteData = async(id:number, tableName: string): Promise<void>=>{
    try{
        const db = await getDb();
        
        const query =  `DELETE FROM ${tableName} WHERE id=?`
        const params = [id]

        await db.executeSql(query, params)
        console.log('✅ Data deleted')
    }
    catch(err){
        console.error('❌ Error deleting data:', err)
    }
}  

export const insertData  = async(tableName: string, newValues: UpdateValue[]): Promise<boolean> => {
    try{
        const db = await getDb();
        const insertField = newValues.reduce( (prev, value, index) => prev + value.field + (index < newValues.length -1 ? ',':'') , "")
        const placeholders  = newValues.reduce ((prev,__, index) => prev + '?' + (index < newValues.length -1 ? ',':''),'')
        const params = newValues.map(v => v.newValue);

        const query = `INSERT INTO ${tableName} (${insertField}) VALUES (${placeholders })`;

        await db.executeSql(query, params);
        console.log('✅ Data inserted')
        return true;
    }
    catch(err){
        console.error('❌ Error inserting data:', err)
        return false;
    }
};

export const getAllData  = async(tableName: string): Promise<any[]> => {
    try{
        const db = await getDb();

        const query = `SELECT * FROM ${tableName}`;

        const [results] = await db.executeSql(query, []);
        const rows = results.rows;
        const data: any[] = [];

        for (let i = 0; i < rows.length; i++) {
        data.push(rows.item(i));
        }

        console.log(`✅ Selected ${data.length} rows from ${tableName}`);
        return data;
    } catch (err) {
        console.error('❌ Error selecting data:', err);
        return [];
    }
};

export const searchProductsByNameOrCategory = async (keyword: string) => {
  try {
    const db = await getDb();
    const [results] = await db.executeSql(
      `
      SELECT products.* FROM products
      JOIN categories ON products.categoryId = categories.id
      WHERE products.name LIKE ? OR categories.name LIKE ?
      `,
      [`%${keyword}%`, `%${keyword}%`]
    );

    const products: any[] = [];
    const rows = results.rows;
    for (let i = 0; i < rows.length; i++) {
      products.push(rows.item(i));
    }
    console.log('✅ Search completed');
    return products;
  } catch (error) {
    console.error('❌ Error searching by name or category:', error);
    return [];
  }
};
export const checkUserExists = async (username: string): Promise<boolean> => {
  try {
    const db = await getDb();
    const [results] = await db.executeSql(
        'SELECT COUNT(*) as count FROM users WHERE username = ?',
        [username]
    );
    const count = results.rows.item(0).count;
    return count > 0;
    } catch (error) {
    console.error('❌ Error checking user existence:', error);
    return false;
  }
};
export const getUserByCredentials = async (
  username: string,
  password: string
) => {
  try {
    const db = await getDb();

    const [results] = await db.executeSql(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );

    const rows = results.rows;

    if (rows.length > 0) {
      return rows.item(0);
    }

    return null;
  } catch (error) {
    console.error('❌ Error getting user by credentials:', error);
    return null;
  }
};
export const getUserById = async (id: number) => {
  try {
    const db = await getDb();

    const [results] = await db.executeSql(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    const rows = results.rows;

    if (rows.length > 0) {
      return rows.item(0);
    }

    return null;
  } catch (error) {
    console.error('❌ Error getting user by id:', error);
    return null;
  }
};


