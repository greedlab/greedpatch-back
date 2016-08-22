/**
 * Created by Bell on 16/8/10.
 */

import Book from '../models/book';

import Debug from 'debug';
import pkg from '../../package.json';
const debug = new Debug(pkg.name);

/**
 * list books
 *
 * @example curl -X GET localhost:4002/book/list
 *
 * @param ctx
 * @param next
 * @returns {books:[{name: "book", price: "$100"}]}
 */
export async function listBook(ctx, next) {
    try {
        const books = await Book.find();
        if (!books) {
            ctx.throw(404);
        }
        ctx.body = {
            books
        };
    } catch (err) {
        if (err === 404 || err.name === 'CastError') {
            ctx.throw(404);
        }
        ctx.throw(500);
    }
    if(next) {
        return next();
    };
}

/**
 * add book
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST -d 'name=book name&price=$100'  localhost:4002/book/add
 * @param ctx
 *
 * @param next
 * @returns {id: "XXXXXX", name: "book", price: "$100"}
 */
export async function addBook(ctx, next) {
    debug(ctx.request.body);
    const book = new Book(ctx.request.body);
    try {
        await book.save();
    } catch (err) {
        ctx.throw(422, err.message);
    }
    const response = book.toJSON();
    ctx.body = response;
    if (next) {
        return next();
    }
}

/**
 * show book detail
 *
 * @example curl -X GET localhost:4002/book/detail?id=57ac63281bc525c5243715c6
 *
 * @param ctx
 * @param next
 * @returns {*}
 */
export async function showBook(ctx, next) {
    try {
        const book = await Book.findById(ctx.request.query.id);
        if (!book) {
            ctx.throw(404);
        }
        ctx.body = {
            book
        };
    } catch (err) {
        if (err === 404 || err.name === 'CastError') {
            ctx.throw(404);
        }
        ctx.throw(500);
    }
    if(next) {
        return next();
    };
}

/**
 * delete book
 *
 * @example curl -H "Authorization: Bearer <token>" -X POST -d 'id=57ac63281bc525c5243715c6'  localhost:4002/book/delete
 * @param ctx
 * @param next
 */
export async function deleteBook(ctx, next) {
    try {
        const book = new Book(ctx.request.body);
        await book.remove();
    } catch (err) {
        ctx.throw(500);
    }
    ctx.status = 200;
    ctx.body = {
        success: true
    };
}
