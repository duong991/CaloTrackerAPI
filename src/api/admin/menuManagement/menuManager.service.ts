// import Meal from '../../../models/Meal';
// import Menu from '../../../models/Menu';
// import MealMenu from '../../../models/MealMenu';
// import {
//     ICreateMenuRequest,
//     IUpdateMenuRequest,
// } from '../../../interfaces/requests/admin/menu-interface';
// import { Transaction } from 'sequelize';
// import { sequelize } from '../../../config/connectDB';
// interface IMenuManagerService {
//     getTableMenus(): Promise<Menu[]>;
//     getAllMenus(): Promise<Menu[]>;
//     getMenuById(id: number): Promise<Menu | null>;
//     createMenu(req: ICreateMenuRequest): Promise<Menu>;
//     updateMenu(mealId: number, req: IUpdateMenuRequest): Promise<boolean>;
//     deleteMenu(mealId: number): Promise<boolean>;
// }

// const MenuManagerService: IMenuManagerService = {
//     getTableMenus: async (): Promise<Menu[]> => {
//         const menus = await Menu.findAll();
//         return menus;
//     },
//     getAllMenus: async (): Promise<Menu[]> => {
//         const menus = await Menu.findAll({
//             include: {
//                 model: MealMenu,
//                 as: 'mealMenus',
//                 include: [
//                     {
//                         model: Meal,
//                         as: 'meal',
//                     },
//                 ],
//             },
//         });
//         return menus;
//     },
//     getMenuById: async (id: number): Promise<Menu | null> => {
//         const menu = await Menu.findByPk(id, {
//             include: {
//                 model: MealMenu,
//                 as: 'mealMenus',
//                 include: [
//                     {
//                         model: Meal,
//                         as: 'meal',
//                     },
//                 ],
//             },
//         });
//         return menu;
//     },
//     createMenu: async (req: ICreateMenuRequest): Promise<Menu> => {
//         const { name, description, mealMenu } = req;
//         console.log(MealMenu);
//         const newMenu = await Menu.create({ name, description });
//         const newMenuId = newMenu.id;
//         mealMenu.map(async (item) => {
//             try {
//                 await MealMenu.create({
//                     menuId: newMenuId,
//                     mealId: item.mealId,
//                 });
//             } catch (error) {
//                 console.log(error);
//             }
//         });
//         return newMenu;
//     },
//     updateMenu: async (
//         menuId: number,
//         req: IUpdateMenuRequest,
//     ): Promise<boolean> => {
//         const t: Transaction = await sequelize.transaction();
//         const { name, description, mealMenu } = req;
//         try {
//             // Tìm tất cả các id bản ghi trong bảng MealMenu có chứa menuId
//             const _mealMenu = await MealMenu.findAll({
//                 attributes: ['id'],
//                 where: {
//                     menuId: menuId,
//                 },
//                 transaction: t,
//                 raw: true,
//             });
//             // chuyển sang mảng các id
//             const mealMenuIds = [];
//             for (let i = 0; i < _mealMenu.length; i++) {
//                 mealMenuIds.push(_mealMenu[i].id);
//             }
//             // lấy ra các bản ghi không có id trong bảng MealMenu (các bản ghi mới)
//             const newMealMenus = mealMenu.filter((item) => {
//                 return !item.id;
//             });
//             // lấy ra các id của bản ghi cần xóa trong bảng MealMenu
//             // (các bản ghi có id nhưng không có trong mảng mealMenu được gửi lên)
//             // ta thực hiện lấy ra các id của các bản ghi không có trong mảng mealMenu
//             // và có trong mảng mealMenuIds
//             const deleteMealMenuIds = mealMenuIds.filter((item) => {
//                 return !mealMenu.find((mealMenu) => {
//                     return mealMenu.id === item;
//                 });
//             });

//             // thưc hiện xóa các bản ghi trong bảng MealMenu
//             if (deleteMealMenuIds.length > 0) {
//                 await MealMenu.destroy({
//                     where: {
//                         id: deleteMealMenuIds,
//                     },
//                     transaction: t,
//                 });
//             }

//             // thực hiện cập nhật các bản ghi trong bảng MealMenu
//             // (các bản ghi có id và có trong mảng mealMenu được gửi lên)
//             for (let i = 0; i < mealMenu.length; i++) {
//                 const _updateMealMenu = mealMenu[i];
//                 if (_updateMealMenu.id) {
//                     await MealMenu.update(
//                         {
//                             menuId: menuId,
//                             mealId: _updateMealMenu.mealId,
//                         },
//                         {
//                             where: {
//                                 id: _updateMealMenu.id,
//                             },
//                             transaction: t,
//                         },
//                     );
//                 }
//             }
//             // thực hiện tạo mới các bản ghi trong bảng MealMenu
//             for (let i = 0; i < newMealMenus.length; i++) {
//                 const newMealMenu = newMealMenus[i];
//                 await MealMenu.create(
//                     {
//                         menuId: menuId,
//                         mealId: newMealMenu.mealId,
//                     },
//                     {
//                         transaction: t,
//                     },
//                 );
//             }

//             // Cập nhật bảng Meal
//             await Menu.update(
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
//             await MealMenu.destroy({
//                 where: {
//                     menuId: menuId,
//                 },
//                 transaction: t,
//             });

//             await Menu.destroy({
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
// export default MenuManagerService;
