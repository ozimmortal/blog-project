import { integer, pgTable, varchar,jsonb,uuid,timestamp,text, boolean } from "drizzle-orm/pg-core";


export const blogTable = pgTable("blogTable", {
  id:uuid("id").primaryKey(),
  title:varchar("title", { length: 125 }).notNull(),
  description:text("description", ).notNull(),
  content:jsonb("content").notNull(),
  createdAt:timestamp("createdAt").defaultNow().notNull(),
  views:integer("views").default(7).notNull(),
  catagories:jsonb("catagories").notNull(),
  published: boolean('published').notNull().default(false),
  userId: text('userId').notNull().references(()=> user.id)
});

export const customerTable = pgTable("customerTable", {
  id:uuid("id").primaryKey(),
  email:text("email").notNull(),
  createdAt:timestamp("createdAt").defaultNow().notNull(),
});

export const imageTable = pgTable("imageTable", {
  id:uuid("id").primaryKey(),
  imageUrl:text("imageUrl").notNull(),
  createdAt:timestamp("createdAt").defaultNow().notNull(),
  userId: text('userId').notNull().references(()=> user.id)
});


			
export const user = pgTable("user", {
					id: text("id").primaryKey(),
					name: text('name').notNull(),
 email: text('email').notNull().unique(),
 emailVerified: boolean('emailVerified').notNull(),
 image: text('image'),
 createdAt: timestamp('createdAt').notNull(),
 updatedAt: timestamp('updatedAt').notNull()
				});

export const session = pgTable("session", {
					id: text("id").primaryKey(),
					expiresAt: timestamp('expiresAt').notNull(),
 ipAddress: text('ipAddress'),
 userAgent: text('userAgent'),
 userId: text('userId').notNull().references(()=> user.id)
				});

export const account = pgTable("account", {
					id: text("id").primaryKey(),
					accountId: text('accountId').notNull(),
 providerId: text('providerId').notNull(),
 userId: text('userId').notNull().references(()=> user.id),
 accessToken: text('accessToken'),
 refreshToken: text('refreshToken'),
 idToken: text('idToken'),
 expiresAt: timestamp('expiresAt'),
 password: text('password')
				});

export const verification = pgTable("verification", {
					id: text("id").primaryKey(),
					identifier: text('identifier').notNull(),
 value: text('value').notNull(),
 expiresAt: timestamp('expiresAt').notNull()
				});
