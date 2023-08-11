import mysql, { Connection, RowDataPacket } from 'mysql2/promise';

const options: mysql.ConnectionOptions = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

async function QueryDB(
  sql: string,
  params: any[] = []
): Promise<RowDataPacket[]> {
  const connection: Connection = await mysql.createConnection(options);
  const result = await connection.execute(sql, params);
  const rows: RowDataPacket[] = result[0] as RowDataPacket[];
  return rows;
}

export default QueryDB;
