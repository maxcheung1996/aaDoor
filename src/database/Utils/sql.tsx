import { capSQLiteSet } from "@capacitor-community/sqlite";

export const createComFileTablesNoEncryption: string = `
    CREATE TABLE IF NOT EXISTS com_file (
      id INTEGER PRIMARY KEY NOT NULL,
      fileName TEXT,
      base64 TEXT,
      type TEXT,
      remark TEXT,
      last_modified INTEGER DEFAULT (strftime('%s', 'now'))
    );
    CREATE INDEX IF NOT EXISTS com_file_index_last_modified ON com_file (last_modified);
    CREATE TRIGGER IF NOT EXISTS com_file_trigger_last_modified AFTER UPDATE ON com_file
    FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified  
    BEGIN  
        UPDATE com_file SET last_modified= (strftime('%s', 'now')) WHERE id=OLD.id;   
    END;  
    PRAGMA user_version = 1;
`;
