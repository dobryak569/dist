const http = require('http');
const fs = require('fs');
const path = require('path');

// Создаем сервер
const server = http.createServer((req, res) => {
    // Определяем путь к файлу
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html'; // Если запрашивается корень, отдаем index.html
    }

    // Определяем расширение файла
    const extname = String(path.extname(filePath)).toLowerCase();
    let contentType = 'text/html'; // По умолчанию HTML

    // Устанавливаем тип контента в зависимости от расширения
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        case '.mp4':
            contentType = 'video/mp4';
            break;
        case '.woff':
            contentType = 'application/font-woff';
            break;
        case '.ttf':
            contentType = 'application/font-ttf';
            break;
        case '.eot':
            contentType = 'application/vnd.ms-fontobject';
            break;
        case '.otf':
            contentType = 'application/font-otf';
            break;
    }

    // Читаем файл и отправляем его в ответ
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Sorry, there was an error: ' + error.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Запускаем сервер на порту 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
