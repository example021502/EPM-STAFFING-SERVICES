/* 
==============================
        INSERT/POST
==============================
*/

// Front End
createbyUserIdService(URL, objData) <../../utils/server_until/service>

// Back End
insertController() <util/controller.js>
* api/[users,jobs,dr]/create/:table

/* 
==============================
        GET BY ID
==============================
*/
// Front End
getByIdService(URL, id)     <../../utils/server_until/service>


// Backend
getByIdController() <util/controller.js>
* api/[users,jobs,dr]/get/:table/:id    <../routes/dynamicRoutes.js>


/* 
==============================
        UPDATE BY ID
==============================
*/
// router.patch("/update/id/:table/:id", updateByIdController);
// export const updateByIdService = async (URL, data, table, id)