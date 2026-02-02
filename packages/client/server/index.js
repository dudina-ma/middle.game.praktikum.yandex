"use strict";
// import dotenv from 'dotenv'
// dotenv.config()
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { HelmetData } from 'react-helmet'
// import express, { Request as ExpressRequest } from 'express'
// import path from 'path'
// import fs from 'fs/promises'
// import { createServer as createViteServer, ViteDevServer } from 'vite'
// import serialize from 'serialize-javascript'
// import cookieParser from 'cookie-parser'
// const port = process.env.PORT || 80
// const clientPath = path.join(__dirname, '..')
// const isDev = process.env.NODE_ENV === 'development'
// async function createServer() {
//   const app = express()
//   app.use(cookieParser())
//   let vite: ViteDevServer | undefined
//   if (isDev) {
//     vite = await createViteServer({
//       server: { middlewareMode: true },
//       root: clientPath,
//       appType: 'custom',
//     })
//     app.use(vite.middlewares)
//   } else {
//     app.use(
//       express.static(path.join(clientPath, 'dist/client'), { index: false })
//     )
//   }
//   app.get('*', async (req, res, next) => {
//     const url = req.originalUrl
//     try {
//       // Получаем файл client/index.html который мы правили ранее
//       // Создаём переменные
//       let render: (
//         req: ExpressRequest
//       ) => Promise<{ html: string; initialState: unknown; helmet: HelmetData; styleTags: string }>
//       let template: string
//       if (vite) {
//         template = await fs.readFile(
//           path.resolve(clientPath, 'index.html'),
//           'utf-8'
//         )
//         // Применяем встроенные HTML-преобразования vite и плагинов
//         template = await vite.transformIndexHtml(url, template)
//         // Загружаем модуль клиента, который писали выше,
//         // он будет рендерить HTML-код
//         render = (
//           await vite.ssrLoadModule(
//             path.join(clientPath, 'src/entry-server.tsx')
//           )
//         ).render
//       } else {
//         template = await fs.readFile(
//           path.join(clientPath, 'dist/client/index.html'),
//           'utf-8'
//         )
//         // Получаем путь до сбилдженого модуля клиента, чтобы не тащить средства сборки клиента на сервер
//         const pathToServer = path.join(
//           clientPath,
//           'dist/server/entry-server.js'
//         )
//         // Импортируем этот модуль и вызываем с инишл стейтом
//         render = (await import(pathToServer)).render
//       }
//       // Получаем HTML-строку из JSX
//       const { html: appHtml, initialState, helmet, styleTags } = await render(req)
//       // Заменяем комментарий на сгенерированную HTML-строку
//       const html = template
//         .replace('<!--ssr-styles-->', styleTags)
//         .replace(`<!--ssr-helmet-->`, `${helmet.meta.toString()} ${helmet.title.toString()} ${helmet.link.toString()}`)
//         .replace(`<!--ssr-outlet-->`, appHtml)
//         .replace(
//           `<!--ssr-initial-state-->`,
//           `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
//             isJSON: true,
//           })}</script>`
//         )
//       // Завершаем запрос и отдаём HTML-страницу
//       res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
//     } catch (e) {
//       vite.ssrFixStacktrace(e as Error)
//       next(e)
//     }
//   })
//   app.listen(port, () => {
//     console.log(`Client is listening on port: ${port}`)
//   })
// }
// createServer()
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const vite_1 = require("vite");
const serialize_javascript_1 = __importDefault(require("serialize-javascript"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const port = process.env.PORT || 80;
const clientPath = path_1.default.join(__dirname, '..');
const isDev = process.env.NODE_ENV === 'development';
const NO_SSR = process.env.NO_SSR === 'true'; // Флаг для отключения SSR
async function createServer() {
    const app = (0, express_1.default)();
    app.use((0, cookie_parser_1.default)());
    let vite;
    if (isDev) {
        vite = await (0, vite_1.createServer)({
            server: { middlewareMode: true },
            root: clientPath,
            appType: 'custom',
        });
        app.use(vite.middlewares);
    }
    else {
        app.use(express_1.default.static(path_1.default.join(clientPath, 'dist/client'), { index: false }));
    }
    app.get('*', async (req, res, next) => {
        const url = req.originalUrl;
        try {
            // Если SSR отключен - отдаём базовый HTML для SPA
            if (NO_SSR) {
                let template;
                if (vite) {
                    template = await promises_1.default.readFile(path_1.default.resolve(clientPath, 'index.html'), 'utf-8');
                    template = await vite.transformIndexHtml(url, template);
                }
                else {
                    template = await promises_1.default.readFile(path_1.default.join(clientPath, 'dist/client/index.html'), 'utf-8');
                }
                // Отдаём HTML без SSR данных
                const html = template
                    .replace('<!--ssr-styles-->', '')
                    .replace('<!--ssr-helmet-->', '')
                    .replace('<!--ssr-outlet-->', '')
                    .replace('<!--ssr-initial-state-->', '');
                res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
                return;
            }
            // Оригинальный SSR код...
            let render;
            let template;
            if (vite) {
                template = await promises_1.default.readFile(path_1.default.resolve(clientPath, 'index.html'), 'utf-8');
                template = await vite.transformIndexHtml(url, template);
                render = (await vite.ssrLoadModule(path_1.default.join(clientPath, 'src/entry-server.tsx'))).render;
            }
            else {
                template = await promises_1.default.readFile(path_1.default.join(clientPath, 'dist/client/index.html'), 'utf-8');
                const pathToServer = path_1.default.join(clientPath, 'dist/server/entry-server.js');
                render = (await Promise.resolve().then(() => __importStar(require(pathToServer)))).render;
            }
            const { html: appHtml, initialState, helmet, styleTags, } = await render(req);
            const html = template
                .replace('<!--ssr-styles-->', styleTags)
                .replace(`<!--ssr-helmet-->`, `${helmet.meta.toString()} ${helmet.title.toString()} ${helmet.link.toString()}`)
                .replace(`<!--ssr-outlet-->`, appHtml)
                .replace(`<!--ssr-initial-state-->`, `<script>window.APP_INITIAL_STATE = ${(0, serialize_javascript_1.default)(initialState, {
                isJSON: true,
            })}</script>`);
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        }
        catch (e) {
            if (vite) {
                vite.ssrFixStacktrace(e);
            }
            next(e);
        }
    });
    app.listen(port, () => {
        console.log(`Server is listening on port: ${port}`);
        console.log(`SSR mode: ${NO_SSR ? 'DISABLED (SPA mode)' : 'ENABLED'}`);
    });
}
createServer();
