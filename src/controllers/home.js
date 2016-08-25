/**
 * Created by Bell on 16/8/10.
 */

/**
 * get api list
 *
 * @example curl -X GET localhost:4002/
 * @param ctx
 * @param next
 */
export async function index(ctx, next) {
    ctx.body = {
        registerUser: '<domain>/user/register',
        loginUser: '<domain>/user/login',
        logoutUser: '<domain>/user/logout',
        listUser: '<domain>/user/list',
        addBook: '<domain>/book/add',
        listBook: '<domain>/book/list',
        showBook: '<domain>/book/detail',
        deleteBook: '<domain>/book/delete'
    };
}
