import { RouteObject, createBrowserRouter } from "react-router-dom";

import { CommonCode } from "../../src/pages/management/CommonCode";
import { Login } from "../../src/pages/Login";
import { Notice } from "../../src/pages/management/Notice";
import { DashBoard } from "../components/layout/DashBoard/DashBoard";
import { NotFound } from "../components/common/NotFound/NotFound";
import { DetailCode } from "../pages/management/DetailCode";

const routers: RouteObject[] = [
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Login /> },
    {
        path: "/react",
        element: <DashBoard />,
        // children: [{ path: "management/notice", element: <Notice /> }],
        children: [
            {
                path: "management",
                children: [
                    {
                        path: "notice",
                        element: <Notice />,
                    },
                    {
                        path: "common-code",
                        element: <CommonCode />,
                    },
                    {
                        path: "common-code/:groupIdx", //:의 의미는 값을 변할 수 있다라는 의미
                        // path:"common-code/:id", //:의 의미는 값을 변할 수 있다라는 의미
                        element: <DetailCode />,
                    },
                ],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
