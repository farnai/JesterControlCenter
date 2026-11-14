import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const records=sqliteTable('records',{id:text('id').primaryKey(),kind:text('kind').notNull(),data:text('data').notNull(),version:integer('version').notNull().default(1)});
export const events=sqliteTable('events',{id:text('id').primaryKey(),recordId:text('record_id').notNull(),data:text('data').notNull(),at:text('at').notNull()});
