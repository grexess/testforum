import { Mongo } from 'meteor/mongo';

export const Topics = new Mongo.Collection('topics');
export const Threads = new Mongo.Collection('threads');
export const Posts = new Mongo.Collection('posts');
