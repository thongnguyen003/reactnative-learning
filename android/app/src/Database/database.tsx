import SQLite,{SQLiteDatabase} from 'react-native-sqlite-storage';
import { Category, Product } from '../components/type/Object';

SQLite.enablePromise(true);

export const getDb = async (): Promise<SQLiteDatabase> =>{
    const db = await SQLite.openDatabase({ name: 'MyDatabase.db',location: 'default'})
    return db
}
const listCategoty: Category[] = [{id: 1, name: 'Áo'},{id: 2, name: 'Quần'},{id: 3, name: 'Giày'},{id: 4, name: 'Túi'},];
const listProduct: Product[] = [
    {id:1, name: 'Áo ngắn tay', price: 12, categoryId:1, image:'file:///data/user/0/com.learning/cache/rn_image_picker_lib_temp_1882660d-a707-4141-9106-a7a29b485615.jpg'},
    {id:2, name: 'Quần tây đen', price: 20, categoryId:2, image:'file:///data/user/0/com.learning/cache/rn_image_picker_lib_temp_1882660d-a707-4141-9106-a7a29b485615.jpg'},
    {id:3, name: 'Giày vải', price: 30, categoryId:3, image:'file:///data/user/0/com.learning/cache/rn_image_picker_lib_temp_1882660d-a707-4141-9106-a7a29b485615.jpg'},
    {id:4, name: 'Túi da cá sấu', price: 50, categoryId:4, image:'file:///data/user/0/com.learning/cache/rn_image_picker_lib_temp_1882660d-a707-4141-9106-a7a29b485615.jpg'},
]
export const initDatabase = async (onSuccess?: ()=>void):Promise<void>=>{
    try{
        const db = await getDb();
        await db.executeSql('DROP TABLE IF EXISTS products');
        await db.executeSql('DROP TABLE IF EXISTS categories');
        await db.executeSql('DROP TABLE IF EXISTS users');
        await db.executeSql(
            `CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY,
                name TEXT
            );`,
        );
        await db.executeSql(
            `CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY,
                name TEXT,
                price Real,
                image text,
                categoryId INTEGER,
                FOREIGN KEY (categoryId) REFERENCES categories(id)
            );`,
        ),
        await db.executeSql(
            `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT,
                role TEXT
            );`,
        );
        listCategoty.forEach(async (category) => {
            await db.executeSql(
                `INSERT INTO categories (id, name) VALUES (?, ?);`,
                [category.id, category.name],
            );
        });
        listProduct.forEach(async (product) => {
            await db.executeSql(
                `INSERT INTO products (id, name, price, image, categoryId) VALUES (?, ?, ?, ?, ?);`,
                [product.id, product.name, product.price, product.image, product.categoryId],
            );
        });
        await db.executeSql(
            `INSERT INTO users (username, password, role)
            SELECT 'admin', '123456', 'admin'
            WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin')`,
        ),
        console.log('✅ Database initialized');
        if(onSuccess) onSuccess()
    }
    catch(err){
        console.error('❌ initDatabase outer error:', err);
    }
}