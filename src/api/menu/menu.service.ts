// import UserMeal from '../../models/UserMeal';
// import Meal from '../../models/Meal';
// import UserMealMenu from '../../models/UserMealMenu';
// import UserMenu from '../../models/UserMenu';

// import {
//     ICreateUserMenuRequest,
//     IUpdateUserMenuRequest,
// } from '../../interfaces/requests/user/user-menu.interface';
// import { Transaction } from 'sequelize';
// import { sequelize } from '../../config/connectDB';
// interface IUserMenuService {
//     getAllMenus(userId: number): Promise<UserMenu[]>;
//     getAllMenusByUserId(userId: number): Promise<UserMenu[]>;
//     getMenuById(id: number): Promise<UserMenu | null>;
//     createMenu(req: ICreateUserMenuRequest): Promise<UserMenu>;
//     updateMenu(mealId: number, req: IUpdateUserMenuRequest): Promise<boolean>;
//     deleteMenu(mealId: number): Promise<boolean>;
// }

// const UserMenuService: IUserMenuService = {
//     getAllMenus: async (userId: number): Promise<UserMenu[]> => {
//         const menus = await UserMenu.findAll({
//             where: { userId: userId },
//         });
//         return menus;
//     },
//     getAllMenusByUserId: async (userId: number): Promise<UserMenu[]> => {
//         const menus = await UserMenu.findAll({
//             where: { userId: userId },
//             include: {
//                 model: UserMealMenu,
//                 as: 'userMealMenus',
//                 include: [
//                     {
//                         model: Meal,
//                         as: 'meal',
//                     },
//                     {
//                         model: UserMeal,
//                         as: 'userMeal',
//                     },
//                 ],
//             },
//         });
//         return menus;
//     },
//     getMenuById: async (id: number): Promise<UserMenu | null> => {
//         const userMeal = await UserMenu.findByPk(id, {
//             include: {
//                 model: UserMealMenu,
//                 as: 'userMealMenus',
//                 include: [
//                     {
//                         model: Meal,
//                         as: 'meal',
//                     },
//                     {
//                         model: UserMeal,
//                         as: 'userMeal',
//                     },
//                 ],
//             },
//         });
//         return userMeal;
//     },
//     createMenu: async (req: ICreateUserMenuRequest): Promise<UserMenu> => {
//         const { userId, name, description, userMealMenu } = req;
//         console.log(userMealMenu);
//         const newMenu = await UserMenu.create({ userId, name, description });
//         const newMenuId = newMenu.id;
//         userMealMenu.map(async (item) => {
//             try {
//                 await UserMealMenu.create({
//                     menuId: newMenuId,
//                     mealId: item.mealId,
//                     userMealId: item.userMealId,
//                 });
//             } catch (error) {
//                 console.log(error);
//             }
//         });
//         return newMenu;
//     },
//     updateMenu: async (
//         menuId: number,
//         req: IUpdateUserMenuRequest,
//     ): Promise<boolean> => {
//         const t: Transaction = await sequelize.transaction();
//         const { name, description, userMealMenu } = req;
//         try {
//             // Tìm tất cả các id bản ghi trong bảng UserMealMenu có chứa menuId
//             const mealMenu = await UserMealMenu.findAll({
//                 attributes: ['id'],
//                 where: {
//                     menuId: menuId,
//                 },
//                 transaction: t,
//                 raw: true,
//             });
//             // chuyển sang mảng các id
//             const mealMenuIds = [];
//             for (let i = 0; i < mealMenu.length; i++) {
//                 mealMenuIds.push(mealMenu[i].id);
//             }
//             // lấy ra các bản ghi không có id trong bảng UserMealMenu (các bản ghi mới)
//             const newMealMenus = userMealMenu.filter((item) => {
//                 return !item.id;
//             });
//             // lấy ra các id của bản ghi cần xóa trong bảng UserMealMenu
//             // (các bản ghi có id nhưng không có trong mảng userMealMenu được gửi lên)
//             // ta thực hiện lấy ra các id của các bản ghi không có trong mảng userMealMenu
//             // và có trong mảng mealMenuIds
//             const deleteMealMenuIds = mealMenuIds.filter((item) => {
//                 return !userMealMenu.find((mealMenu) => {
//                     return mealMenu.id === item;
//                 });
//             });

//             // thưc hiện xóa các bản ghi trong bảng UserMealMenu
//             if (deleteMealMenuIds.length > 0) {
//                 await UserMealMenu.destroy({
//                     where: {
//                         id: deleteMealMenuIds,
//                     },
//                     transaction: t,
//                 });
//             }

//             // thực hiện cập nhật các bản ghi trong bảng UserMealMenu
//             // (các bản ghi có id và có trong mảng userMealMenu được gửi lên)
//             for (let i = 0; i < userMealMenu.length; i++) {
//                 const mealMenu = userMealMenu[i];
//                 if (mealMenu.id) {
//                     await UserMealMenu.update(
//                         {
//                             menuId: menuId,
//                             mealId: mealMenu.mealId,
//                             userMealId: mealMenu.userMealId,
//                         },
//                         {
//                             where: {
//                                 id: mealMenu.id,
//                             },
//                             transaction: t,
//                         },
//                     );
//                 }
//             }
//             // thực hiện tạo mới các bản ghi trong bảng UserMealMenu
//             for (let i = 0; i < newMealMenus.length; i++) {
//                 const newMealMenu = newMealMenus[i];
//                 await UserMealMenu.create(
//                     {
//                         menuId: menuId,
//                         mealId: newMealMenu.mealId,
//                         userMealId: newMealMenu.userMealId,
//                     },
//                     {
//                         transaction: t,
//                     },
//                 );
//             }

//             // Cập nhật bảng Meal
//             await UserMenu.update(
//                 {
//                     name,
//                     description,
//                 },
//                 {
//                     where: {
//                         id: menuId,
//                     },
//                     transaction: t,
//                 },
//             );

//             // Commit transaction
//             await t.commit();
//             return true;
//         } catch (error) {
//             await t.rollback();
//             throw error;
//         }
//     },

//     deleteMenu: async (menuId: number): Promise<boolean> => {
//         const t: Transaction = await sequelize.transaction();
//         try {
//             await UserMealMenu.destroy({
//                 where: {
//                     menuId: menuId,
//                 },
//                 transaction: t,
//             });

//             await UserMenu.destroy({
//                 where: {
//                     id: menuId,
//                 },
//                 transaction: t,
//             });
//             await t.commit();
//             return true;
//         } catch (error) {
//             await t.rollback();
//             console.error(error);
//             return false;
//         }
//     },
// };
// export default UserMenuService;
