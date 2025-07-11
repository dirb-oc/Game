@echo off
setlocal

echo Ejecutando BackUp...
start "" /min cmd /c "cd /d C:\Users\jason\OneDrive\Documentos\Proyectos\Games && python BackUp.py"

echo Ejecutando Backend...
start "" cmd /k "cd /d C:\Users\jason\OneDrive\Documentos\Proyectos\Games\Backend && python manage.py runserver"

echo Ejecutando Frontend...
start "" cmd /k "cd /d C:\Users\jason\OneDrive\Documentos\Proyectos\Games\frontend && npm run dev"

timeout /t 1 > nul
start "" http://localhost:5173

endlocal