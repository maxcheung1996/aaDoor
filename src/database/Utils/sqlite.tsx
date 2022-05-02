import {
  capSQLiteValues,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { sqlite } from "../../App";
import {} from "../Utils/sql";

export const sqlExecuteStatement = async (dbName: string, sql: string) => {
  try {
    let encryption = "no-encryption";
    const ret = await sqlite.checkConnectionsConsistency();
    const isConn = (await sqlite.isConnection(dbName)).result;

    var db: SQLiteDBConnection;
    if (ret.result && isConn) {
      db = await sqlite.retrieveConnection(dbName);
    } else {
      db = await sqlite.createConnection(dbName, false, encryption, 1);
    }

    await db.open();
    let query = sql;

    const res: any = await db.execute(query);
    await db.close();
    await sqlite.closeConnection(dbName);
  } catch (error) {
    alert(`sqlExecuteStatement Error: ${error}`);
  }
};

export const sqlQuery = async (dbName: string, querySql: string) => {
  let resp: capSQLiteValues = { values: [] };

  try {
    let encryption = "no-encryption";
    const ret = await sqlite.checkConnectionsConsistency();
    const isConn = (await sqlite.isConnection(dbName)).result;

    var db: SQLiteDBConnection;
    if (ret.result && isConn) {
      db = await sqlite.retrieveConnection(dbName);
    } else {
      db = await sqlite.createConnection(dbName, false, encryption, 1);
    }

    await db.open();
    let query = querySql;

    resp = await db.query(query);
    await db.close();
    await sqlite.closeConnection(dbName);
  } catch (error) {
    alert(`sqlExecuteStatement Error: ${error}`);
  }
  return resp;
};

export const getCurrentPlatform = async () => {
  let platform = await sqlite
    .getPlatform()
    .then((resp: { platform: string }) => {
      return resp;
    });

  return platform;
};

export const deleteDatabase = async (db: SQLiteDBConnection): Promise<void> => {
  try {
    let ret: any = await db.isExists();
    if (ret.result) {
      const dbName = db.getConnectionDBName();
      console.log("$$$ database " + dbName + " before delete");
      await db.delete();
      console.log("$$$ database " + dbName + " after delete " + ret.result);
      return Promise.resolve();
    } else {
      return Promise.resolve();
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
