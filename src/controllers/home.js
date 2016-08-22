/**
 * Created by Bell on 16/8/10.
 */

export async function index(ctx) {
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
